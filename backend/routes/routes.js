const express = require("express");
const router = express.Router();
const FoodCombo = require("../models/FoodCombo");

// Get all food combos
router.get("/", async (req, res) => {
  try {
    const combos = await FoodCombo.find();
    res.json(combos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch food combos" });
  }
});

// Add a new food combo
router.post("/", async (req, res) => {
  try {
    const newCombo = new FoodCombo(req.body);
    await newCombo.save();
    res.status(201).json(newCombo);
  } catch (error) {
    res.status(500).json({ message: "Failed to add food combo" });
  }
});

// Update a food combo
router.put("/:id", async (req, res) => {
  try {
    const updatedCombo = await FoodCombo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCombo);
  } catch (error) {
    res.status(500).json({ message: "Failed to update food combo" });
  }
});

// Delete a food combo
router.delete("/:id", async (req, res) => {
  try {
    await FoodCombo.findByIdAndDelete(req.params.id);
    res.json({ message: "Food combo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete food combo" });
  }
});

module.exports = router;
