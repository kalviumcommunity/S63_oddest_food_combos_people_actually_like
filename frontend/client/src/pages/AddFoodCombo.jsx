import React, { useState } from "react";
import axios from "axios";
import "../styles/AddFoodCombo.css";

const AddFoodCombo = ({ fetchCombos }) => {
  const [combo, setCombo] = useState({ name: "", description: "" });
  const [successMessage, setSuccessMessage] = useState(""); // ✅ Success message state

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!combo.name || !combo.description) return;

    try {
      await axios.post("http://localhost:5000/api/combos", combo);
      fetchCombos();
      setCombo({ name: "", description: "" });

      // ✅ Show success message
      setSuccessMessage("✅ Combo added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000); // Clear after 3s
    } catch (error) {
      console.error("Error adding food combo", error);
    }
  };

  return (
    <div className="add-combo-container">
      <h2>Add Food Combo</h2>
      {successMessage && <p className="success-msg">{successMessage}</p>} {/* ✅ Display success message */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Combo Name"
          value={combo.name}
          onChange={(e) => setCombo({ ...combo, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={combo.description}
          onChange={(e) => setCombo({ ...combo, description: e.target.value })}
        />
        <button type="submit">Add Combo</button>
      </form>
    </div>
  );
};

export default AddFoodCombo;
