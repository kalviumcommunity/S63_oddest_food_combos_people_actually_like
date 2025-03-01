require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const connectDB = require("./MongoDB"); 
const menuRoutes = require("./routes/routes"); 
const cors = require("cors");

const app = express();


connectDB();


app.use(cors());
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



app.use("/api", menuRoutes); 



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
