const BodyStyle = require("../models/bodyStyle");
const Car = require("../models/car");
const asyncHandler = require("express-async-handler");

// Display list of all bodystyle.
exports.bodystyle_list = asyncHandler(async (req, res, next) => {
  const allBodyStyle = await BodyStyle.find().sort({ name: 1 }).exec();

  res.render("bodystyle_list", {
    title: "BodyStyle List",
    bodystyle_list: allBodyStyle,
  });
});

// Display detail page for a specific bodystyle.
exports.bodystyle_detail = asyncHandler(async (req, res, next) => {
  // Get details of bodystyle and all associated cars (in parallel)
  const [bodyStyle, carsInBodyStyle] = await Promise.all([
    BodyStyle.findById(req.params.id).exec(),
    Car.find({ body_style: req.params.id }, "name manufacturer")
      .populate("manufacturer")
      .exec(),
  ]);

  if (bodyStyle === null) {
    // No results.
    const err = new Error("BodyStyle not found");
    err.status = 404;
    return next(err);
  }

  res.render("bodystyle_detail", {
    title: "Body Style Detail",
    bodystyle: bodyStyle,
    bodystyle_cars: carsInBodyStyle,
  });
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
