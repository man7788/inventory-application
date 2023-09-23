const BodyStyle = require("../models/bodyStyle");
const Car = require("../models/car");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
  res.render("bodystyle_form", { title: "Create Body Style" });
});

// Handle bodystyle create on POST.
exports.bodystyle_create_post = [
  // Validate and sanitize the name field.
  body("type", "Body Style must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const bodystyle = new BodyStyle({ type: req.body.type });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("bodystyle_form", {
        title: "Create Body Style",
        bodystyle: bodystyle,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if BodyStyle with same name already exists.
      const bodystyleExists = await BodyStyle.findOne({
        type: req.body.type,
      }).exec();
      if (bodystyleExists) {
        // BodyStyle exists, redirect to its detail page.
        res.redirect(bodystyleExists.url);
      } else {
        await bodystyle.save();
        // New bodystyle saved. Redirect to bodystyle detail page.
        res.redirect(bodystyle.url);
      }
    }
  }),
];

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
