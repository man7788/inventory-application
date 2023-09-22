const BodyStyle = require("../models/bodyStyle");
const asyncHandler = require("express-async-handler");

// Display list of all bodystyle.
exports.bodystyle_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BodyStyle list");
});

// Display detail page for a specific bodystyle.
exports.bodystyle_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: BodyStyle detail: ${req.params.id}`);
});

// Display bodystyle create form on GET.
exports.bodystyle_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BodyStyle create GET");
});

// Handle bodystyle create on POST.
exports.bodystyle_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BodyStyle create POST");
});

// Display bodystyle delete form on GET.
exports.bodystyle_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BodyStyle delete GET");
});

// Handle bodystyle delete on POST.
exports.bodystyle_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BodyStyle delete POST");
});

// Display bodystyle update form on GET.
exports.bodystyle_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BodyStyle update GET");
});

// Handle bodystyle update on POST.
exports.bodystyle_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BodyStyle update POST");
});
