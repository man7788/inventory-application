const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BodyStyleSchema = new Schema({
  type: { type: String, required: true },
});

// Virtual for BodyType's URL
BodyStyleSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/bodystyle/${this._id}`;
});

// Export model
module.exports = mongoose.model("BodyStyle", BodyStyleSchema);
