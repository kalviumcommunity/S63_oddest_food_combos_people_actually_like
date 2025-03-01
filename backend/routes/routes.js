const express = require("express");
const multer = require("multer");
const FoodCombo = require("../models/FoodCombo");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Create a new food combo
router.post("/api/combos", upload.single("image"), async (req, res) => {
  try {
    const { name, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newCombo = new FoodCombo({ name, description, imageUrl });
    await newCombo.save();

    // Return updated combos list
    const updatedCombos = await FoodCombo.find().sort({ createdAt: -1 });
    res.status(201).json(updatedCombos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all food combos
router.get("/api/combos", async (req, res) => {
  try {
    const combos = await FoodCombo.find().sort({ createdAt: -1 });
    res.status(200).json(combos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
