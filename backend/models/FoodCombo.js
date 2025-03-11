const mongoose = require("mongoose");

const FoodComboSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false }
});

module.exports = mongoose.model("FoodCombo", FoodComboSchema);
