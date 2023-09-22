const Manufacturer = require("../models/manufacturer");
const Car = require("../models/car");
const asyncHandler = require("express-async-handler");

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
