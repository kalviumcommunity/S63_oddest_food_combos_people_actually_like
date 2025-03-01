const mongoose = require("mongoose");

const FoodComboSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model("FoodCombo", FoodComboSchema);
