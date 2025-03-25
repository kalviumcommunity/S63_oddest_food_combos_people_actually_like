import React, { useState, useEffect } from "react";
import axios from "axios";

const UserHistory = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    // ✅ Fetch Users from API (Only Once)
    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5003/api/users");
            setUsers(response.data);
            console.log("Fetched Users:", response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // ✅ Delete User (Fixed)
    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5003/api/users/delete/${id}`);

            setUsers(prevUsers => prevUsers.filter(user => user._id !== id));

            console.log(`User ${id} deleted successfully!`);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // ✏️ Edit User
    const editUser = (user) => {
        setEditingUser(user._id);
        setUsername(user.username);
        setEmail(user.email);
    };

    // ✅ Update User (Fixed)
    const updateUser = async () => {
        if (!editingUser) return;

        try {
            const response = await axios.put(`http://localhost:5003/api/users/update/${editingUser}`, {
                username,
                email
            });

            console.log("Updated User Data:", response.data);

            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user._id === editingUser ? { ...user, username, email } : user
                )
            );

            setEditingUser(null);
            setUsername("");
            setEmail("");
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="user-history">
            <h2>User List</h2>

            {/* ✅ Edit User Form */}
            {editingUser && (
                <div className="edit-form">
                    <h3>Edit User</h3>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <button onClick={updateUser}>Update</button>
                    <button onClick={() => setEditingUser(null)}>Cancel</button>
                </div>
            )}

            {/* ✅ Display User List */}
            <ul>
                {users.length > 0 ? (
                    users.map(user => (
                        <li key={user._id}>
                            <span>{user.username} ({user.email})</span>
                            <button onClick={() => editUser(user)}>Edit</button>
                            <button onClick={() => deleteUser(user._id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </ul>
        </div>
    );
};

export default UserHistory;
