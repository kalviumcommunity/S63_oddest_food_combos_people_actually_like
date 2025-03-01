import React, { useState } from "react";
import axios from "axios";
import { MdFastfood } from "react-icons/md";
import { FaUtensils } from "react-icons/fa";
import { AiOutlineFieldTime } from "react-icons/ai";
import "../styles/AddFoodCombo.css"

const AddFoodCombo = ({ fetchCombos }) => {
  const [combo, setCombo] = useState({
    name: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    setCombo({ ...combo, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setCombo({ ...combo, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", combo.name);
    formData.append("description", combo.description);
    if (combo.image) formData.append("image", combo.image);

    try {
      await axios.post("http://localhost:5000/api/combos", formData);
      alert("✅ Combo Added Successfully!");
      setCombo({ name: "", description: "", image: null });
      fetchCombos();
    } catch (error) {
      console.error("Error adding combo:", error);
    }
  };

  return (
    <div className="add-food-container">
      <div className="add-food-card">
        <h2 className="add-food-title">
          <MdFastfood /> Add Your Unique Combo
        </h2>
        <form className="add-food-form" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="input-container">
            <FaUtensils className="input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Combo Name"
              value={combo.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description Input */}
          <div className="input-container">
            <AiOutlineFieldTime className="input-icon" />
            <textarea
              name="description"
              placeholder="Describe your combo..."
              rows="3"
              value={combo.description}
              onChange={handleChange}
            />
          </div>

          {/* Image Upload (Optional) */}
          <input type="file" name="image" onChange={handleFileChange} />

          {/* Submit Button */}
          <button className="add-food-btn" type="submit">
            Add Combo
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFoodCombo;
