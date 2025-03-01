// const express = require("express");
// const router = express.Router();
// const MenuItem = require("../models/MenuItem");

// // Route to add a new food combo
// router.post("/api/combos", async (req, res) => {
//   try {
//     const { name, description, imageUrl } = req.body;

//     // Validate required fields
//     if (!name || !description || !imageUrl) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     // Create new combo
//     const newCombo = new MenuItem({ name, description, imageUrl });
//     await newCombo.save();

//     res.status(201).json({
//       message: "Food combo added successfully!",
//       combo: newCombo, // Return the saved combo
//     });
//   } catch (error) {
//     console.error("Error adding combo:", error);
//     res.status(500).json({ error: "Failed to add combo" });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const MenuItem = require("../models/MenuItem");

// // Route to add a new food combo
// router.post("/combos", async (req, res) => { // 👈 FIXED: Removed extra "/api"
//   try {
//     const { name, description, imageUrl } = req.body;
//     const newCombo = new MenuItem({ name, description, imageUrl });
//     await newCombo.save();
//     res.status(201).json({ message: "Food combo added successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to add combo" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// Route to add a new food combo
router.post("/combos", async (req, res) => { 
  try {
    const { name, description, imageUrl } = req.body;
    const newCombo = new MenuItem({ name, description, imageUrl });
    await newCombo.save();
    res.status(201).json({ message: "Food combo added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add combo" });
  }
});

// Test Route to Check If Routes Are Working
router.get("/test", (req, res) => {
  res.json({ message: "API is working!" });
});

module.exports = router;
