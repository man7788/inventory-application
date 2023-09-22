const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarSchema = new Schema({
  name: { type: String, required: true, minLength: 1, maxLength: 100 },
  manufacturer: {
    type: Schema.Types.ObjectId,
    ref: "Manufacturer",
    required: true,
  },
  body_style: { type: Schema.Types.ObjectId, ref: "BodyStyle", required: true },
  price: { type: Number, required: true, min: 1 },
});

// Virtual for Car's URL
CarSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/car/${this._id}`;
});

// Export model
module.exports = mongoose.model("Car", CarSchema);
