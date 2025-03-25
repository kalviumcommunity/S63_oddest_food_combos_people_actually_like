const express = require("express");
const router = express.Router();
// const FoodCombo = require("../models/FoodCombo");
const MenuItem = require("../models/MenuItem");

// 🟢 Add a new food combo
router.post("/add", async (req, res) => {
    try {
        const { name, description, imageUrl, created_by } = req.body;

        if (!name || !description || !created_by) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newCombo = new MenuItem({ name, description, imageUrl, created_by });
        await newCombo.save();

        res.status(201).json({ message: "✅ Food combo added successfully!" });
    } catch (error) {
        console.error("Error adding food combo:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 🟡 Get food combos (Filtered by user if needed)
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(req.params , "line no 28")
        console.log(userId , "line no 28")     
        console.log("Fetching food combos for user:", userId);
        
        const combos = await MenuItem.find({ created_by: userId }).populate("created_by", "name");
        console.log("Food Combos Found:", combos);

        if (combos.length===0) {
            return res.status(404).json({ message: "No food combos found for this user." });
        }

        res.status(200).json(combos);
    } catch (error) {
        console.error("Error fetching food combos:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
