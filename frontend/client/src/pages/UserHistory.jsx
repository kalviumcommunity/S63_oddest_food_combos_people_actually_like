import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/UserHistory.css";

const UserHistory = () => {
    const [foodCombos, setFoodCombos] = useState([]);
    const [editingCombo, setEditingCombo] = useState(null); // Track which combo is being edited
    const [editedData, setEditedData] = useState({ name: "", description: "" });

    // Fetch user food combos
    useEffect(() => {
        fetchCombos();
    }, []);

    const fetchCombos = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/foodCombos");
            setFoodCombos(response.data);
        } catch (error) {
            console.error("❌ Error fetching combos:", error);
        }
    };

    // ✅ DELETE functionality
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/foodCombos/delete/${id}`);
            setFoodCombos(foodCombos.filter(combo => combo._id !== id)); // Remove from UI
            alert("✅ Deleted successfully!");
        } catch (error) {
            console.error("❌ Error deleting combo:", error);
            alert("Failed to delete.");
        }
    };

    // ✅ EDIT functionality
    const handleEditClick = (combo) => {
        setEditingCombo(combo._id); // Set the combo in edit mode
        setEditedData({ name: combo.name, description: combo.description });
    };

    const handleEditChange = (e) => {
        setEditedData({ ...editedData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/foodCombos/update/${id}`, editedData);
            alert("✅ Updated successfully!");
            setEditingCombo(null); // Exit edit mode
            fetchCombos(); // Refresh the list
        } catch (error) {
            console.error("❌ Error updating combo:", error);
            alert("Failed to update.");
        }
    };

    return (
        <div>
            <h2>🍽️ Your Food Combos</h2>
            <ul>
                {foodCombos.map(combo => (
                    <li key={combo._id}>
                        {editingCombo === combo._id ? (
                            // ✅ Edit Mode
                            <>
                                <input
                                    type="text"
                                    name="name"
                                    value={editedData.name}
                                    onChange={handleEditChange}
                                />
                                <input
                                    type="text"
                                    name="description"
                                    value={editedData.description}
                                    onChange={handleEditChange}
                                />
                                <button onClick={() => handleEditSubmit(combo._id)}>✅ Save</button>
                                <button onClick={() => setEditingCombo(null)}>❌ Cancel</button>
                            </>
                        ) : (
                            // ✅ Normal Display
                            <>
                                <strong>{combo.name}</strong>: {combo.description}
                                <button onClick={() => handleEditClick(combo)}>✏️ Edit</button>
                                <button onClick={() => handleDelete(combo._id)}>🗑️ Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserHistory;
