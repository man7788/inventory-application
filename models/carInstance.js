const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarInstanceSchema = new Schema({
  car: {
    type: Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  production_date: { type: Date, required: true },
  sold_date: { type: Date },
});

// Virtual for CarInstance's URL
CarInstanceSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/carinstance/${this._id}`;
});

// Export model
module.exports = mongoose.model("CarInstance", CarInstanceSchema);
