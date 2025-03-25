const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    description: { type: String, required: true, minlength: 5 },
    imageUrl: { type: String},
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // ✅ Add this field
}, { timestamps: true });

module.exports = mongoose.model("MenuItem", MenuItemSchema);
