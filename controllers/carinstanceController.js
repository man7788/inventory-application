const CarInstance = require("../models/carInstance");
const asyncHandler = require("express-async-handler");

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
