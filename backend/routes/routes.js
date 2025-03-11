const express = require("express");
const router = express.Router();
const FoodCombo = require("../models/FoodCombo");

// ✅ Create a new food combo
router.post("/food-combos", async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: "Name and description are required" });
    }
    const newCombo = new FoodCombo({ name, description, imageUrl });
    await newCombo.save();
    res.status(201).json(newCombo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create food combo" });
  }
});

// ✅ Fetch all food combos
router.get("/food-combos", async (req, res) => {
  try {
    const combos = await FoodCombo.find();
    res.json(combos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch food combos" });
  }
});

// ✅ Fetch a single food combo
router.get("/food-combos/:id", async (req, res) => {
  try {
    const combo = await FoodCombo.findById(req.params.id);
    if (!combo) return res.status(404).json({ error: "Food combo not found" });
    res.json(combo);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch food combo" });
  }
});

// ✅ Update food combo
router.put("/food-combos/:id", async (req, res) => {
  try {
    const updatedCombo = await FoodCombo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCombo) return res.status(404).json({ error: "Food combo not found" });
    res.json(updatedCombo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update food combo" });
  }
});

// ✅ Delete food combo
router.delete("/food-combos/:id", async (req, res) => {
  try {
    const deletedCombo = await FoodCombo.findByIdAndDelete(req.params.id);
    if (!deletedCombo) return res.status(404).json({ error: "Food combo not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete food combo" });
  }
});

module.exports = router;
