const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [5, "Description must be at least 5 characters"],
        trim: true,
    },
    imageUrl: {
        type: String,
        validate: {
            validator: function (value) {
                if (!value) return true; // Image URL is optional
                return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/.test(value);
            },
            message: "Invalid image URL format",
        },
    },
});

const MenuItem = mongoose.model("MenuItem", MenuItemSchema);
module.exports = MenuItem;
