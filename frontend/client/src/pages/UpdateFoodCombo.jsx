import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateFoodCombo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", description: "", imageUrl: "" });

  // Fetch existing food combo details
  useEffect(() => {
    fetch(`http://localhost:5000/api/food-combos/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.error("Error fetching combo:", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/food-combos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Update failed");
      navigate("/user-history"); // Redirect to history page after update
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  return (
    <div>
      <h2>Update Food Combo</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Name" />
        <input type="text" name="description" value={formData.description} onChange={handleChange} required placeholder="Description" />
        <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL (optional)" />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateFoodCombo;
