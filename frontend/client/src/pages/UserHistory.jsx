import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/UserHistory.css";

const UserHistory = () => {
  const [combos, setCombos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCombos();
  }, []);

  const fetchCombos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/combos");
      setCombos(res.data);
    } catch (err) {
      setError("Failed to load combos. Please check the server.");
    }
  };

  const handleEdit = async (id) => {
    const newName = prompt("Enter new name:");
    if (newName) {
      try {
        await axios.put(`http://localhost:5000/api/combos/${id}`, { name: newName });
        fetchCombos();
      } catch (error) {
        console.error("Error updating combo", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/combos/${id}`);
      fetchCombos();
    } catch (error) {
      console.error("Error deleting combo", error);
    }
  };

  return (
    <div className="history-container">
      <h2>Your Food Combos</h2>
      {error && <p className="error">{error}</p>}
      {combos.length === 0 ? (
        <p>No combos found.</p>
      ) : (
        <ul>
          {combos.map((combo) => (
            <li key={combo._id}>
              {combo.name}
              <button className="edit-btn" onClick={() => handleEdit(combo._id)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(combo._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserHistory;
