const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// ✅ Get all food combos
router.get("/", async (req, res) => {
    try {
        const foodCombos = await MenuItem.find();
        res.status(200).json(foodCombos);
    } catch (error) {
        console.error("❌ Error fetching food combos:", error);
        res.status(500).json({ error: "Server error while fetching food combos." });
    }
});

// ✅ Add a new food combo (with validation)
router.post("/add", async (req, res) => {
    try {
        const { name, description, imageUrl } = req.body;

        // ✅ Backend Validation
        if (!name || name.length < 3) {
            return res.status(400).json({ error: "❌ Name must be at least 3 characters long." });
        }
        if (!description || description.length < 5) {
            return res.status(400).json({ error: "❌ Description must be at least 5 characters long." });
        }
        if (imageUrl && !/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/.test(imageUrl)) {
            return res.status(400).json({ error: "❌ Invalid image URL format." });
        }

        const newFoodCombo = new MenuItem({ name, description, imageUrl });
        await newFoodCombo.save();
        res.status(201).json({ message: "✅ Food combo added successfully!", foodCombo: newFoodCombo });
    } catch (error) {
        console.error("❌ Error adding food combo:", error);
        res.status(500).json({ error: "Server error while adding food combo." });
    }
});

// ✅ Update a food combo (Edit)
router.put("/edit/:id", async (req, res) => {
    try {
        const { name, description, imageUrl } = req.body;
        const { id } = req.params;

        // ✅ Backend Validation
        if (!name || name.length < 3) {
            return res.status(400).json({ error: "❌ Name must be at least 3 characters long." });
        }
        if (!description || description.length < 5) {
            return res.status(400).json({ error: "❌ Description must be at least 5 characters long." });
        }
        if (imageUrl && !/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/.test(imageUrl)) {
            return res.status(400).json({ error: "❌ Invalid image URL format." });
        }

        const updatedCombo = await MenuItem.findByIdAndUpdate(
            id,
            { name, description, imageUrl },
            { new: true, runValidators: true }
        );

        if (!updatedCombo) {
            return res.status(404).json({ error: "❌ Food combo not found." });
        }

        res.status(200).json({ message: "✅ Food combo updated successfully!", foodCombo: updatedCombo });
    } catch (error) {
        console.error("❌ Error updating food combo:", error);
        res.status(500).json({ error: "Server error while updating food combo." });
    }
});

// ✅ Delete a food combo
router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCombo = await MenuItem.findByIdAndDelete(id);

        if (!deletedCombo) {
            return res.status(404).json({ error: "❌ Food combo not found." });
        }

        res.status(200).json({ message: "✅ Food combo deleted successfully!" });
    } catch (error) {
        console.error("❌ Error deleting food combo:", error);
        res.status(500).json({ error: "Server error while deleting food combo." });
    }
});

module.exports = router;
