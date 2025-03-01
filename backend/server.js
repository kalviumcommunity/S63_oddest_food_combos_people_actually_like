const express = require("express");

const mongoose = require("mongoose");

const connectDB = require("./MongoDB"); 

const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const routes = require("./routes/routes");

const app = express();

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};
connectDB();

// Middleware
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use(express.json());


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
  res.send("pong");
});


app.use("/api", menuRoutes);


app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});


// Routes
app.use(routes);


app.use("/api", menuRoutes); 



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
