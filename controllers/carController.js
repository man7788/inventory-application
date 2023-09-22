const Car = require("../models/car");
const Manufacturer = require("../models/manufacturer");
const BodyStyle = require("../models/bodyStyle");
const CarInstance = require("../models/carInstance");
const asyncHandler = require("express-async-handler");

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
  res.send("NOT IMPLEMENTED: Car create GET");
});

// Handle car create on POST.
exports.car_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Car create POST");
});

// Display car delete form on GET.
exports.car_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Car delete GET");
});

// Handle car delete on POST.
exports.car_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Car delete POST");
});

// Display car update form on GET.
exports.car_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Car update GET");
});

// Handle car update on POST.
exports.car_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Car update POST");
});
