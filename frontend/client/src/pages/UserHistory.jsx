// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const UserHistory = () => {
//   const [foodCombos, setFoodCombos] = useState([]);
//   const navigate = useNavigate();

//   // Fetch user-added food combos
//   useEffect(() => {
//     fetch("http://localhost:5000/api/food-combos")
//       .then((res) => res.json())
//       .then((data) => setFoodCombos(data))
//       .catch((err) => console.error("Error fetching food combos:", err));
//   }, []);

//   // Handle delete functionality
//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/food-combos/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) throw new Error("Delete failed");

//       // Remove deleted item from the list
//       setFoodCombos(foodCombos.filter((combo) => combo._id !== id));
//     } catch (error) {
//       console.error("Error deleting food combo:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Your Submitted Food Combos</h2>
//       {foodCombos.length === 0 ? (
//         <p>No food combos added yet.</p>
//       ) : (
//         foodCombos.map((combo) => (
//           <div key={combo._id} className="food-combo-card">
//             <h3>{combo.name}</h3>
//             <p>{combo.description}</p>
//             {combo.imageUrl && <img src={combo.imageUrl} alt={combo.name} />}
            
//             {/* ✅ Add Edit Button */}
//             <button onClick={() => navigate(`/update-food-combo/${combo._id}`)}>Edit</button>
            
//             {/* ✅ Delete Button */}
//             <button onClick={() => handleDelete(combo._id)}>Delete</button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default UserHistory;


import React, { useEffect, useState } from "react";
import "../styles/UserHistory.css";

const UserHistory = () => {
    const [foodCombos, setFoodCombos] = useState([]);
    const [editingCombo, setEditingCombo] = useState(null);
    const [formData, setFormData] = useState({ name: "", description: "", image: "" });

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/food-combos");
                const data = await response.json();
                setFoodCombos(data);
            } catch (error) {
                console.error("Error fetching history:", error);
            }
        };

        fetchHistory();
    }, []);

    // Handle Edit Button Click
    const handleEdit = (combo) => {
        setEditingCombo(combo._id);
        setFormData({
            name: combo.name,
            description: combo.description,
            image: combo.image || "",
        });
    };

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Save Button Click
    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/food-combos/${editingCombo}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to update combo");

            // Update local state with new data
            setFoodCombos((prevCombos) =>
                prevCombos.map((combo) =>
                    combo._id === editingCombo ? { ...combo, ...formData } : combo
                )
            );

            setEditingCombo(null);
        } catch (error) {
            console.error("Error updating combo:", error);
        }
    };

    // Handle Delete
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this combo?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:5000/api/food-combos/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete combo");

            setFoodCombos(foodCombos.filter((combo) => combo._id !== id));
        } catch (error) {
            console.error("Error deleting food combo:", error);
        }
    };

    return (
        <div className="user-history-container">
            <h2>Your Food Combos</h2>
            <div className="user-history-list">
                {foodCombos.length === 0 ? (
                    <p>No food combos found.</p>
                ) : (
                    foodCombos.map((combo) => (
                        <div key={combo._id} className="user-history-card">
                            {editingCombo === combo._id ? (
                                <div className="edit-form">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                    />
                                    <button className="save-btn" onClick={handleSave}>
                                        Save
                                    </button>
                                    <button className="cancel-btn" onClick={() => setEditingCombo(null)}>
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3>{combo.name}</h3>
                                    <p>{combo.description}</p>
                                    {combo.image && <img src={combo.image} alt={combo.name} />}
                                    <div className="user-history-buttons">
                                        <button className="edit-btn" onClick={() => handleEdit(combo)}>Edit</button>
                                        <button className="delete-btn" onClick={() => handleDelete(combo._id)}>Delete</button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UserHistory;
