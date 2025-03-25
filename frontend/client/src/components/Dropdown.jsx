import { useState, useEffect } from "react";

const UserDropdown = ({ onSelectUser }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5003/api/users")
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error("Error fetching users:", err));
    }, []);

    return (
        <select onChange={(e) => onSelectUser(e.target.value)}>
            <option value="">All Users</option>
            {users.map(user => (
                <option key={user._id} value={user._id}>{user.name}</option>
            ))}
        </select>
    );
};

export default UserDropdown;
