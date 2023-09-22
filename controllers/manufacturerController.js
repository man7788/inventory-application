const Manufacturer = require("../models/manufacturer");
const asyncHandler = require("express-async-handler");

// Display list of all manufacturer.
exports.manufacturer_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Manufacturer list");
});

// Display detail page for a specific manufacturer.
exports.manufacturer_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Manufacturer detail: ${req.params.id}`);
});

// Display manufacturer create form on GET.
exports.manufacturer_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Manufacturer create GET");
});

// Handle manufacturer create on POST.
exports.manufacturer_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Manufacturer create POST");
});

// Display manufacturer delete form on GET.
exports.manufacturer_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Manufacturer delete GET");
});

// Handle manufacturer delete on POST.
exports.manufacturer_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Manufacturer delete POST");
});

// Display manufacturer update form on GET.
exports.manufacturer_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Manufacturer update GET");
});

// Handle manufacturer update on POST.
exports.manufacturer_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Manufacturer update POST");
});
