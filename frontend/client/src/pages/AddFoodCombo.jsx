import { useState } from "react";

function AddFoodCombo() {
  const [combo, setCombo] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setCombo({ ...combo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    if (!combo.name.trim() || !combo.description.trim() || !combo.imageUrl.trim()) {
      setMessage("⚠️ All fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/combos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(combo),
      });

      if (response.ok) {
        setMessage("✅ Combo added successfully!");
        setCombo({ name: "", description: "", imageUrl: "" });
      } else {
        setMessage("❌ Error adding combo.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Error adding combo.");
    }
  };

  return (
    <div>
      <h2>Add a New Food Combo</h2>
      {message && <p style={{ color: message.includes("Error") ? "red" : "green" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Combo Name"
          value={combo.name}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Combo Description"
          value={combo.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={combo.imageUrl}
          onChange={handleChange}
        />
        <button type="submit">Add Combo</button>
      </form>
    </div>
  );
}

export default AddFoodCombo;
