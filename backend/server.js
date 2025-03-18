const express = require("express");



const mongoose = require("mongoose");

const connectDB = require("./MongoDB"); 

const cors = require("cors");

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


app.use(express.json());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routes
app.use("/api/combos", foodComboRoutes);

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
