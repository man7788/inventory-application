const CarInstance = require("../models/carInstance");
const Car = require("../models/car");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all carinstance.
exports.carinstance_list = asyncHandler(async (req, res, next) => {
  const allCarInstances = await CarInstance.find()
    .populate({
      path: "car",
      populate: {
        path: "manufacturer",
      },
    })
    .exec();

  res.render("carinstance_list", {
    title: "Car Instance List",
    carinstance_list: allCarInstances,
  });
});

// Display detail page for a specific carinstance.
exports.carinstance_detail = asyncHandler(async (req, res, next) => {
  const carInstance = await CarInstance.findById(req.params.id)
    .populate({
      path: "car",
      populate: {
        path: "manufacturer",
      },
    })
    .populate({
      path: "car",
      populate: {
        path: "body_style",
      },
    })
    .exec();

  if (carInstance === null) {
    // No results.
    const err = new Error("Specific car not found");
    err.status = 404;
    return next(err);
  }

  res.render("carinstance_detail", {
    title: "Car Instance Detail",
    carinstance: carInstance,
  });
});

// Display carinstance create form on GET.
exports.carinstance_create_get = asyncHandler(async (req, res, next) => {
  const allCars = await Car.find({}, "name").exec();

  res.render("carinstance_form", {
    title: "Create Car Instance",
    car_list: allCars,
  });
});

// Handle carinstance create on POST.
exports.carinstance_create_post = [
  // Validate and sanitize fields.
  body("car", "Car must be specified").trim().isLength({ min: 1 }).escape(),
  body("production_date", "Invalid production date").isISO8601().toDate(),
  body("sold_date", "Invalid sold date")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data.
    const carInstance = new CarInstance({
      car: req.body.car,
      production_date: req.body.production_date,
      sold_date: req.body.sold_date,
    });

    if (!errors.isEmpty()) {
      // There are errors.
      // Render form again with sanitized values and error messages.
      const allCars = await Car.find({}, "name").exec();

      res.render("carinstance_form", {
        title: "Create Car Instance",
        car_list: allCars,
        selected_car: carInstance.car._id,
        carinstance: carInstance,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid
      await carInstance.save();
      res.redirect(carInstance.url);
    }
  }),
];

// Display carinstance delete form on GET.
exports.carinstance_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of carinstance
  const carinstance = await CarInstance.findById(req.params.id).exec();

  if (carinstance === null) {
    // No results.
    res.redirect("/catalog/carinstances");
  }

  res.render("carinstance_delete", {
    title: "Delete Car Instance",
    carinstance: carinstance,
  });
});

// Handle carinstance delete on POST.
exports.carinstance_delete_post = asyncHandler(async (req, res, next) => {
  // Get details of carinstance
  const carinstance = await CarInstance.findById(req.params.id).exec();

  //Delete carinstance and redirect to the list of carinstances.
  await CarInstance.findByIdAndRemove(req.body.carinstanceid);
  res.redirect("/catalog/carinstances");
});

// Display carinstance update form on GET.
exports.carinstance_update_get = asyncHandler(async (req, res, next) => {
  // Get carinstances, cars for form.
  const [carInstance, allCars] = await Promise.all([
    CarInstance.findById(req.params.id).populate("car").exec(),
    Car.find().exec(),
  ]);

  if (carInstance === null) {
    // No results.
    const err = new Error("Car Instance not found");
    err.status = 404;
    return next(err);
  }

  res.render("carinstance_form", {
    title: "Update Car Instance",
    carinstance: carInstance,
    car_list: allCars,
    selected_car: carInstance.car._id,
  });
});

// Handle carinstance update on POST.
exports.carinstance_update_post = [
  // Validate and sanitize fields.
  body("car", "Car must be specified").trim().isLength({ min: 1 }).escape(),
  body("production_date", "Invalid production date").isISO8601().toDate(),
  body("sold_date", "Invalid sold date")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data.
    const carInstance = new CarInstance({
      car: req.body.car,
      production_date: req.body.production_date,
      sold_date: req.body.sold_date,
      _id: req.params.id, // This is required, or a new ID will be assigned!
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all manufacturers and bodystyles for form.
      // Get carinstances, cars for form.
      const [carInstance, allCars] = await Promise.all([
        CarInstance.findById(req.params.id).populate("car").exec(),
        Car.find().exec(),
      ]);

      res.render("carinstance_form", {
        title: "Update Car Instance",
        carinstance: carInstance,
        car_list: allCars,
        selected_car: carInstance.car._id,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid. Update the record.
      const updatedCarInstance = await CarInstance.findByIdAndUpdate(
        req.params.id,
        carInstance,
        {}
      );
      // Redirect to car detail page.
      res.redirect(updatedCarInstance.url);
    }
  }),
];
