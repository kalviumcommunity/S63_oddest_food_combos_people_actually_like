const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const foodComboRoutes = require("./routes/routes.js");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // Parses JSON request bodies

// ✅ MongoDB Connection
mongoose.connect("mongodb+srv://Palchhi8:Palchhi12345@cluster0.whdr3.mongodb.net/WeirdFoodCombosDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ API Routes
app.use("/api/foodCombos", foodComboRoutes); 

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
