import { useState } from "react";
import axios from "axios";

const RegisterUser = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); // ✅ Added password input

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5003/api/users/register", {
                username,
                email,
                password, // ✅ Send password in request
                combos: [] // ✅ Ensure combos field exists
            });

            console.log("User Registered:", response.data); // ✅ Debugging
            alert(`✅ ${response.data.message}`);

            // Reset fields after successful registration
            setUsername("");
            setEmail("");
            setPassword("");
        } catch (error) {
            alert("❌ Error registering user.");
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Register User</h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterUser;
