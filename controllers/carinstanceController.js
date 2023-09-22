const CarInstanceInstance = require("../models/carInstance");
const asyncHandler = require("express-async-handler");

// Display list of all carinstance.
exports.carinstance_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: CarInstance list");
});

// Display detail page for a specific carinstance.
exports.carinstance_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: CarInstance detail: ${req.params.id}`);
});

// Display carinstance create form on GET.
exports.carinstance_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: CarInstance create GET");
});

// Handle carinstance create on POST.
exports.carinstance_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: CarInstance create POST");
});

// Display carinstance delete form on GET.
exports.carinstance_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: CarInstance delete GET");
});

// Handle carinstance delete on POST.
exports.carinstance_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: CarInstance delete POST");
});

// Display carinstance update form on GET.
exports.carinstance_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: CarInstance update GET");
});

// Handle carinstance update on POST.
exports.carinstance_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: CarInstance update POST");
});
