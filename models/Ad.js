const mongoose = require("mongoose");

const AdSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  make: { type: String, required: true },
  model: { type: String, required: true },
  dateManufactured: { type: Number, required: true },
  bodyType: { type: String, required: true },
  fuelType: { type: String, required: true },
  gearbox: { type: String, required: true },
  doors: { type: String, required: true },
  damage: { type: String, required: true },
  steeringWheel: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  engineCapacity: { type: String, required: false },
  power: { type: String, required: false },
  VINnumber: { type: String, required: false },
  mileage: { type: Number, required: true },
  dateAdded: { type: Date, default: Date.now },
  description: { type: String },
  phoneNumber: { type: String, required: true },
  featured: { type: Boolean, default: false },
  sold: { type: Boolean, default: false },
  powerUnit: { type: String },
  mileageUnit: { type: String },
  postcode: { type: String },
  // loweredPrice: { type: Boolean, default: false },
  // priceHistory: { type: Array },
  marked: { type: Number, default: 0 },
  imageURL: { type: String },
});

module.exports = mongoose.model("ad", AdSchema);
