const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const foodComboRoutes = require("./routes/routes.js");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://Palchhi8:Palchhi12345@cluster0.whdr3.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// API Routes
app.use("/api/foodCombos", foodComboRoutes);
app.use("/api/users", userRoutes);

// Start Server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
