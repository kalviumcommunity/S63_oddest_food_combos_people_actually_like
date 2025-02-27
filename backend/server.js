require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./MongoDB");
const menuRoutes = require("./routes/routes"); // Import the correct routes file
const cors = require('cors');
const app = express();

connectDB();

// Middleware for parsing JSON requests
app.use(express.json()); // Ensures handling of JSON request bodies
app.use(cors());
// Ping route (testing)
app.get("/ping", (req, res) => {
  try {
    res.send("pong");
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

// *Home Route with DB Status*
app.get("/", (req, res) => {
  const status = mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
  res.json({ message: "Welcome to the API", db_status: status });
});


app.use("/api", menuRoutes); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
