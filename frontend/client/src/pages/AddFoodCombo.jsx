import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AddFoodCombo.css";

const AddFoodCombo = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [userId, setUserId] = useState("");
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ✅ Fetch users when component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get("http://localhost:5003/api/users");
                console.log(response);
                setUsers(response.data);
            } catch (err) {
                console.error("❌ Error fetching users:", err);
                setError("Failed to load users. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // ✅ Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // 🔹 Validate input fields
        if (!userId || !name || !description) {
            setError("❌ All fields (User, Name, Description) are required.");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await axios.post("http://localhost:5003/api/foodCombos/add", {
                name,
                description,
                imageUrl: imageUrl || "https://via.placeholder.com/150", // Default image
                created_by: userId
            });

            alert("✅ " + response.data.message);

            // Reset form fields
            setName("");
            setDescription("");
            setImageUrl("");
            setUserId("");

        } catch (error) {
            console.error("❌ Error adding food combo:", error.response?.data?.error || error.message);
            setError(error.response?.data?.error || "Failed to add food combo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-food-container">
            <h2>🍽️ Add a Food Combo</h2>
            
            {error && <p className="error-msg">{error}</p>}
            
            {isLoading ? (
                <p>🔄 Loading users...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <select id="users" onChange={(e) => setUserId(e.target.value)} value={userId}>
                        <option value="">Select a User</option>
                        {users.map((user) => (
                            <option key={user._id} value={user._id}>{user.username || user.name}
                            </option>
                        ))}
                    </select>

                    <input 
                        type="text" 
                        placeholder="Food Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />

                    <input 
                        type="text" 
                        placeholder="Description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />

                    <input 
                        type="text" 
                        placeholder="Image URL (Optional)" 
                        value={imageUrl} 
                        onChange={(e) => setImageUrl(e.target.value)} 
                    />

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Adding..." : "Add Combo"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default AddFoodCombo;
