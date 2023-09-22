const express = require("express");
const router = express.Router();

// Require controller modules.
const car_controller = require("../controllers/carController");
const bodystyle_controller = require("../controllers/bodystyleController");
const manufacturer_controller = require("../controllers/manufacturerController");
const car_instance_controller = require("../controllers/carinstanceController");

/// CAR ROUTES ///

// GET catalog home page.
router.get("/", car_controller.index);

// GET request for creating a Car. NOTE This must come before routes that display Car (uses id).
router.get("/car/create", car_controller.car_create_get);

// POST request for creating Car.
router.post("/car/create", car_controller.car_create_post);

// GET request to delete Car.
router.get("/car/:id/delete", car_controller.car_delete_get);

// POST request to delete Car.
router.post("/car/:id/delete", car_controller.car_delete_post);

// GET request to update Car.
router.get("/car/:id/update", car_controller.car_update_get);

// POST request to update Car.
router.post("/car/:id/update", car_controller.car_update_post);

// GET request for one Car.
router.get("/car/:id", car_controller.car_detail);

// GET request for list of all Car items.
router.get("/cars", car_controller.car_list);

/// BODYSTYLE ROUTES ///

// GET request for creating BodyStyle. NOTE This must come before route for id (i.e. display bodystyle).
router.get("/bodystyle/create", bodystyle_controller.bodystyle_create_get);

// POST request for creating BodyStyle.
router.post("/bodystyle/create", bodystyle_controller.bodystyle_create_post);

// GET request to delete BodyStyle.
router.get("/bodystyle/:id/delete", bodystyle_controller.bodystyle_delete_get);

// POST request to delete BodyStyle.
router.post(
  "/bodystyle/:id/delete",
  bodystyle_controller.bodystyle_delete_post
);

// GET request to update BodyStyle.
router.get("/bodystyle/:id/update", bodystyle_controller.bodystyle_update_get);

// POST request to update BodyStyle.
router.post(
  "/bodystyle/:id/update",
  bodystyle_controller.bodystyle_update_post
);

// GET request for one BodyStyle.
router.get("/bodystyle/:id", bodystyle_controller.bodystyle_detail);

// GET request for list of all BodyStyles.
router.get("/bodystyles", bodystyle_controller.bodystyle_list);

/// MANUFACTURER ROUTES ///

// GET request for creating a Manufacturer. NOTE This must come before route that displays Manufacturer (uses id).
router.get(
  "/manufacturer/create",
  manufacturer_controller.manufacturer_create_get
);

//POST request for creating Manufacturer.
router.post(
  "/manufacturer/create",
  manufacturer_controller.manufacturer_create_post
);

// GET request to delete Manufacturer.
router.get(
  "/manufacturer/:id/delete",
  manufacturer_controller.manufacturer_delete_get
);

// POST request to delete Manufacturer.
router.post(
  "/manufacturer/:id/delete",
  manufacturer_controller.manufacturer_delete_post
);

// GET request to update Manufacturer.
router.get(
  "/manufacturer/:id/update",
  manufacturer_controller.manufacturer_update_get
);

// POST request to update Manufacturer.
router.post(
  "/manufacturer/:id/update",
  manufacturer_controller.manufacturer_update_post
);

// GET request for one Manufacturer.
router.get("/manufacturer/:id", manufacturer_controller.manufacturer_detail);

// GET request for list of all Manufacturer.
router.get("/manufacturers", manufacturer_controller.manufacturer_list);

/// CARINSTANCE ROUTES ///

// GET request for creating a CarInstance. NOTE This must come before route that displays CarInstance (uses id).
router.get(
  "/carinstance/create",
  car_instance_controller.carinstance_create_get
);

// POST request for creating CarInstance.
router.post(
  "/carinstance/create",
  car_instance_controller.carinstance_create_post
);

// GET request to delete CarInstance.
router.get(
  "/carinstance/:id/delete",
  car_instance_controller.carinstance_delete_get
);

// POST request to delete CarInstance.
router.post(
  "/carinstance/:id/delete",
  car_instance_controller.carinstance_delete_post
);

// GET request to update CarInstance.
router.get(
  "/carinstance/:id/update",
  car_instance_controller.carinstance_update_get
);

// POST request to update CarInstance.
router.post(
  "/carinstance/:id/update",
  car_instance_controller.carinstance_update_post
);

// GET request for one CarInstance.
router.get("/carinstance/:id", car_instance_controller.carinstance_detail);

// GET request for list of all CarInstance.
router.get("/carinstances", car_instance_controller.carinstance_list);

module.exports = router;
