const mongoose = require("mongoose");
const { DateTime } = require("luxon");

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

CarInstanceSchema.virtual("production_date_formatted").get(function () {
  return DateTime.fromJSDate(this.production_date).toLocaleString(
    DateTime.DATE_MED
  );
});

CarInstanceSchema.virtual("sold_date_formatted").get(function () {
  return DateTime.fromJSDate(this.sold_date).toLocaleString(DateTime.DATE_MED);
});

CarInstanceSchema.virtual("production_date_yyyy_mm_dd").get(function () {
  return DateTime.fromJSDate(this.production_date).toISODate(); // format 'YYYY-MM-DD'
});

CarInstanceSchema.virtual("sold_date_yyyy_mm_dd").get(function () {
  return DateTime.fromJSDate(this.sold_date).toISODate(); // format 'YYYY-MM-DD'
});

// Export model
module.exports = mongoose.model("CarInstance", CarInstanceSchema);
