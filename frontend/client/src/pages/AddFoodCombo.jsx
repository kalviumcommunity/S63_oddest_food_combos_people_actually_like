// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import '../styles/AddFoodCombo.css';
// const AddFoodCombo = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ name: "", description: "", imageUrl: "" });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/api/food-combos", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       if (!response.ok) throw new Error("Failed to add food combo");
//       navigate("/user-history"); // Redirect after adding
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Name" />
//       <input type="text" name="description" value={formData.description} onChange={handleChange} required placeholder="Description" />
//       <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL (optional)" />
//       <button type="submit">Add Combo</button>
//     </form>
//   );
// };

// export default AddFoodCombo;


import React, { useState } from "react";
import "../styles/AddFoodCombo.css"; // ✅ Ensure this is imported

const AddFoodCombo = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await fetch("http://localhost:5000/api/food-combos", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to add combo");

            alert("Food combo added successfully!");
            setName("");
            setDescription("");
            setImage(null);
        } catch (error) {
            console.error("Error adding food combo:", error);
        }
    };

    return (
        <div className="add-food-combo-container">
            <h2>Add a New Food Combo</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Food Combo Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                {image && <img src={URL.createObjectURL(image)} alt="Preview" />}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddFoodCombo;
