import React, { useState } from "react";
import axios from "axios";
import "../styles/AddFoodCombo.css";

const AddFoodCombo = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");

    const validateInputs = () => {
        if (!name || name.length < 3) {
            setError("❌ Name must be at least 3 characters long.");
            return false;
        }
        if (!description || description.length < 5) {
            setError("❌ Description must be at least 5 characters long.");
            return false;
        }
        if (imageUrl && !/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/.test(imageUrl)) {
            setError("❌ Invalid image URL format.");
            return false;
        }
        setError(""); // Clear errors if validation passes
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return; // Stop if validation fails

        try {
            const response = await axios.post("http://localhost:5000/api/foodCombos/add", {
                name,
                description,
                imageUrl,
            });
            alert(response.data.message);
            setName("");
            setDescription("");
            setImageUrl("");
        } catch (error) {
            console.error("❌ Error adding food combo:", error.response?.data?.error || error.message);
            setError(error.response?.data?.error || "Failed to add food combo.");
        }
    };

    return (
        <div className="add-food-container">
            <h2>🍽️ Add a Food Combo</h2>
            {error && <p className="error-msg">{error}</p>} {/* Display validation error */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Food Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Image URL (Optional)"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="input-field"
                />
                <button type="submit" className="submit-btn">Add Combo</button>
            </form>
        </div>
    );
};

export default AddFoodCombo;
