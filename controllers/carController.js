const Car = require("../models/car");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
});

// Display list of all cars.
exports.car_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Car list");
});

// Display detail page for a specific car.
exports.car_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Car detail: ${req.params.id}`);
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
