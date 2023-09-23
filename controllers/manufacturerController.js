const Manufacturer = require("../models/manufacturer");
const Car = require("../models/car");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all manufacturer.
exports.manufacturer_list = asyncHandler(async (req, res, next) => {
  const allManufacturers = await Manufacturer.find().sort({ name: 1 }).exec();

  res.render("manufacturer_list", {
    title: "Manufacturer List",
    manufacturer_list: allManufacturers,
  });
});

// Display detail page for a specific manufacturer.
exports.manufacturer_detail = asyncHandler(async (req, res, next) => {
  // Get details of manufacturer and all their cars (in parallel)
  const [manufacturer, allCarsByManufacturer] = await Promise.all([
    Manufacturer.findById(req.params.id).exec(),
    Car.find({ manufacturer: req.params.id }, "name body_style")
      .populate("body_style")
      .exec(),
  ]);

  if (manufacturer === null) {
    // No results.
    const err = new Error("Car not found");
    err.status = 404;
    return next(err);
  }

  res.render("manufacturer_detail", {
    title: "Manufacturer Detail",
    manufacturer: manufacturer,
    manufacturer_cars: allCarsByManufacturer,
  });
});

// Display manufacturer create form on GET.
exports.manufacturer_create_get = asyncHandler(async (req, res, next) => {
  res.render("manufacturer_form", { title: "Create Manufacturer" });
});

// Handle manufacturer create on POST.
exports.manufacturer_create_post = [
  // Validate and sanitize fields.
  body("name", "Manufacturer must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("origin", "Origin must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Author object with escaped and trimmed data
    const manufacturer = new Manufacturer({
      name: req.body.name,
      origin: req.body.origin,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("manufacturer_form", {
        title: "Create Manufacturer",
        manufacturer: manufacturer,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if manufacturer with same name already exists.
      const manufacturerExists = await Manufacturer.findOne({
        name: req.body.name,
      }).exec();
      if (manufacturerExists) {
        // Manufacturer exists, redirect to its detail page.
        res.redirect(manufacturerExists.url);
      } else {
        // Save manufacturer.
        await manufacturer.save();
        // Redirect to new author record.
        res.redirect(manufacturer.url);
      }
    }
  }),
];

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
