import React, { useState, useEffect } from "react";
import axios from "axios";

const FoodCombos = () => {
    const [users, setUsers] = useState([]); // Stores users
    const [selectedUserId, setSelectedUserId] = useState(""); // Selected user ID
    const [foodCombos, setFoodCombos] = useState([]); // Stores food combos
    const [loading, setLoading] = useState(false); // Loading state

    // ✅ Fetch Users from API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5003/api/users");
                console.log(response)
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    // ✅ Fetch Food Combos when a user is selected
    useEffect(() => {
        if (!selectedUserId) {
            setFoodCombos([]); // Clear the list if no user is selected
            return;
        }

        const fetchFoodCombos = async () => {
            setLoading(true);
            try {
                console.log("Fetching food combos for user:", selectedUserId); // Debugging
                const response = await axios.get(`http://localhost:5003/api/foodCombos/${selectedUserId}`);

                console.log("API Response:", response.data); // Debugging
``
                if (Array.isArray(response.data)) {
                    setFoodCombos(response.data);
                } else {
                    console.error("Unexpected API response format:", response.data);
                    setFoodCombos([]); // Avoid breaking UI
                }
            } catch (error) {
                console.error("Error fetching food combos:", error);
                setFoodCombos([]);
            }
            setLoading(false);
        };

        fetchFoodCombos();
    }, [selectedUserId]);

    return (
        <div>
            <h2>Food Combos</h2>

            {/* Dropdown to select user */}
            <select
                id="users"
                onChange={(e) => setSelectedUserId(e.target.value)}
                value={selectedUserId}
            >
                <option value="">Select a User</option>
                {users.map((user) => (
                    <option key={user._id} value={user._id}>
                        {user.username}
                    </option>
                ))}
            </select>

            {/* Loading State */}
            {loading && <p>Loading food combos...</p>}

            {/* Display Food Combos */}
            <div>
                {foodCombos.length > 0 ? (
                    <ul>
                        {foodCombos.map((combo) => (
                            <li key={combo._id}>
                                <strong>{combo.name}</strong>: {combo.description}
                            </li>
                        ))}
                    </ul>
                ) : (
                    !loading && <p>No food combos found for this user.</p>
                )}
            </div>
        </div>
    );
};

export default FoodCombos;
