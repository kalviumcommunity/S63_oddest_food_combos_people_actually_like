const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// ✅ Create a new food combo (POST)
router.post("/combos", async (req, res) => {
    try {
        const { name, description } = req.body;
        const newCombo = new MenuItem({ name, description });
        await newCombo.save();
        res.status(201).json({ message: "Food combo added successfully!", newCombo });
    } catch (error) {
        res.status(500).json({ error: "Server error while adding food combo" });
    }
});

// ✅ Get all food combos (GET)
router.get("/combos", async (req, res) => {
    try {
        const combos = await MenuItem.find();
        res.status(200).json(combos);
    } catch (error) {
        res.status(500).json({ error: "Error fetching food combos" });
    }
});

// ✅ Get a single food combo by ID (GET)
router.get("/combos/:id", async (req, res) => {
    try {
        const combo = await MenuItem.findById(req.params.id);
        if (!combo) return res.status(404).json({ error: "Combo not found" });
        res.status(200).json(combo);
    } catch (error) {
        res.status(500).json({ error: "Error fetching the food combo" });
    }
});

// ✅ Update a food combo by ID (PUT)
router.put("/combos/:id", async (req, res) => {
    try {
        const updatedCombo = await MenuItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedCombo) return res.status(404).json({ error: "Combo not found" });
        res.status(200).json({ message: "Combo updated successfully!", updatedCombo });
    } catch (error) {
        res.status(500).json({ error: "Error updating the food combo" });
    }
});

// ✅ Delete a food combo by ID (DELETE)
router.delete("/combos/:id", async (req, res) => {
    try {
        const deletedCombo = await MenuItem.findByIdAndDelete(req.params.id);
        if (!deletedCombo) return res.status(404).json({ error: "Combo not found" });
        res.status(200).json({ message: "Combo deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting the food combo" });
    }
});

module.exports = router;
