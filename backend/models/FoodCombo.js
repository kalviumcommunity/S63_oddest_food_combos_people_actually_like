const mongoose = require("mongoose");

const FoodComboSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: { type: [String], required: true },
    description: { type: String },
    image: { type: String }
});

module.exports = mongoose.model("FoodCombo", FoodComboSchema);
