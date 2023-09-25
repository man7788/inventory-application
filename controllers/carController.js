const Car = require("../models/car");
const Manufacturer = require("../models/manufacturer");
const BodyStyle = require("../models/bodyStyle");
const CarInstance = require("../models/carInstance");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  // Get details of cars, car instances, manufacturers and bodystyles counts (in parallel)
  const [
    numCars,
    numCarInstances,
    numAvailableCarInstances,
    numManufacturers,
    numBodyStyles,
  ] = await Promise.all([
    Car.countDocuments({}).exec(),
    CarInstance.countDocuments({}).exec(),
    CarInstance.countDocuments({ sold_date: { $exists: false } }).exec(),
    Manufacturer.countDocuments({}).exec(),
    BodyStyle.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Car Inventory",
    car_count: numCars,
    car_instance_count: numCarInstances,
    car_instance_available_count: numAvailableCarInstances,
    manufacturer_count: numManufacturers,
    bodystyle_count: numBodyStyles,
  });
});

// Display list of all cars.
exports.car_list = asyncHandler(async (req, res, next) => {
  const allCars = await Car.find({}, "name manufacturer")
    .sort({ title: 1 })
    .populate("manufacturer")
    .exec();

  res.render("car_list", { title: "Car List", car_list: allCars });
});

// Display detail page for a specific car.
exports.car_detail = asyncHandler(async (req, res, next) => {
  // Get details of car, car instances for specific car
  const [car, carInstances] = await Promise.all([
    Car.findById(req.params.id)
      .populate("manufacturer")
      .populate("body_style")
      .exec(),
    CarInstance.find({ car: req.params.id }).exec(),
  ]);

  if (car === null) {
    // No results.
    const err = new Error("Car not found");
    err.status = 404;
    return next(err);
  }

  res.render("car_detail", {
    title: "Car Detail",
    car: car,
    car_instances: carInstances,
  });
});

// Display car create form on GET.
exports.car_create_get = asyncHandler(async (req, res, next) => {
  // Get all manufacturers and bodystyles, which we can use for adding to our car.
  const [allManufacturers, allBodyStyles] = await Promise.all([
    Manufacturer.find().exec(),
    BodyStyle.find().exec(),
  ]);

  res.render("car_form", {
    title: "Create Car",
    manufacturers: allManufacturers,
    bodystyles: allBodyStyles,
  });
});

// Handle car create on POST.
exports.car_create_post = [
  // Validate and sanitize fields.
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("manufacturer", "Manufacturer must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("bodystyle", "Body Style must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price must not be empty")
    .trim()
    .isLength({ min: 1 })
    .isNumeric()
    .escape(),
  // Process request after validation and sanitization.

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    const car = new Car({
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      body_style: req.body.bodystyle,
      price: req.body.price,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all authors and genres for form.
      const [allManufacturers, allBodyStyles] = await Promise.all([
        Manufacturer.find().exec(),
        BodyStyle.find().exec(),
      ]);

      res.render("car_form", {
        title: "Create Car",
        car: car,
        manufacturers: allManufacturers,
        bodystyles: allBodyStyles,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Save car.
      await car.save();
      res.redirect(car.url);
    }
  }),
];

// Display car delete form on GET.
exports.car_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of car and all their car instances (in parallel)
  const [car, allInstancesByCar] = await Promise.all([
    Car.findById(req.params.id)
      .populate("manufacturer")
      .populate("body_style")
      .exec(),
    CarInstance.find({ car: req.params.id }).exec(),
  ]);

  if (car === null) {
    // No results.
    res.redirect("/catalog/cars");
  }

  res.render("car_delete", {
    title: "Delete Car",
    car: car,
    car_carinstances: allInstancesByCar,
  });
});

// Handle car delete on POST.
exports.car_delete_post = asyncHandler(async (req, res, next) => {
  // Get details of car and all their car instances (in parallel)
  const [car, allInstancesByCar] = await Promise.all([
    Car.findById(req.params.id).exec(),
    CarInstance.find({ car: req.params.id }).exec(),
  ]);

  if (allInstancesByCar.length > 0) {
    // Car has car instances. Render in same way as for GET route.
    res.render("car_delete", {
      title: "Delete Car",
      car: car,
      car_carinstances: allInstancesByCar,
    });
    return;
  } else {
    // Car has no car instance. Delete object and redirect to the list of cars.
    await Car.findByIdAndRemove(req.body.carid);
    res.redirect("/catalog/cars");
  }
});

// Display car update form on GET.
exports.car_update_get = asyncHandler(async (req, res, next) => {
  // Get cars, manufacturers and bodystyles for form.
  const [car, allManufacturers, allBodyStyles] = await Promise.all([
    Car.findById(req.params.id)
      .populate("manufacturer")
      .populate("body_style")
      .exec(),
    Manufacturer.find().exec(),
    BodyStyle.find().exec(),
  ]);

  if (car === null) {
    // No results.
    const err = new Error("Car not found");
    err.status = 404;
    return next(err);
  }

  res.render("car_form", {
    title: "Update Car",
    manufacturers: allManufacturers,
    bodystyles: allBodyStyles,
    car: car,
  });
});

// Handle car update on POST.
exports.car_update_post = [
  // Validate and sanitize fields.
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("manufacturer", "Manufacturer must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("bodystyle", "Body Style must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price must not be empty")
    .trim()
    .isLength({ min: 1 })
    .isNumeric()
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Car object with escaped and trimmed data.
    const car = new Car({
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      body_style: req.body.bodystyle,
      price: req.body.price,
      _id: req.params.id, // This is required, or a new ID will be assigned!
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all manufacturers and bodystyles for form.
      const [allManufacturers, allBodyStyles] = await Promise.all([
        Manufacturer.find().exec(),
        BodyStyle.find().exec(),
      ]);

      res.render("car_form", {
        title: "Update Car",
        car: car,
        manufacturers: allManufacturers,
        bodystyles: allBodyStyles,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid. Update the record.
      const updatedCar = await Car.findByIdAndUpdate(req.params.id, car, {});
      // Redirect to car detail page.
      res.redirect(updatedCar.url);
    }
  }),
];
