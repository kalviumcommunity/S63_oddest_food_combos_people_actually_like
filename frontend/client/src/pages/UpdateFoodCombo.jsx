import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateFoodCombo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", description: "" });

    // ✅ Fetch Existing Data
    useEffect(() => {
        const fetchCombo = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/combos/${id}`);
                if (!response.ok) throw new Error("Failed to fetch combo");
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error("Error fetching combo:", error);
            }
        };
        fetchCombo();
    }, [id]);

    // ✅ Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Update Combo
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/combos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to update combo");
            navigate("/user-history"); // Redirect to User History page
        } catch (error) {
            console.error("Error updating combo:", error);
        }
    };

    return (
        <div>
            <h2>Update Food Combo</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required />

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default UpdateFoodCombo;
