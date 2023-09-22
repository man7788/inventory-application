const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ManufacturerSchema = new Schema({
  name: { type: String, required: true, minLength: 1, maxLength: 100 },
  origin: { type: String, required: true, minLength: 1, maxLength: 100 },
});

// Virtual for Manufacturer's URL
ManufacturerSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/manufacturer/${this._id}`;
});

// Export model
module.exports = mongoose.model("Manufacturer", ManufacturerSchema);
