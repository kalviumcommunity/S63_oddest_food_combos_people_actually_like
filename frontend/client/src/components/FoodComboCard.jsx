
import React from "react";
import { useNavigate } from "react-router-dom";

const FoodComboCard = ({ combo, onDelete }) => {
  const navigate = useNavigate();

  // Ensure combo exists before rendering
  if (!combo) {
    return <p>Loading combo...</p>;
  }

  return (
    <div className="food-combo-card">
      <h3>{combo.name}</h3>
      <p>{combo.description}</p>
      {combo.imageUrl && <img src={combo.imageUrl} alt={combo.name} />}

      {/* Edit Button */}
      <button onClick={() => navigate(`/update-food-combo/${combo._id}`)}>Edit</button>

      {/* Delete Button - Only if onDelete is passed */}
      {onDelete && (
        <button onClick={() => onDelete(combo._id)}>Delete</button>
      )}
    </div>
  );

// const FoodComboCard = ({ combo }) => {
//     return (
//         <div className="food-combo-card">
//             <h2>{combo.name}</h2>
//             <p>{combo.description}</p>
//             <p className="votes">Votes: {combo.votes}</p>
//         </div>
//     );
// };

// export default FoodComboCard;

import { useEffect, useState } from "react";
import axios from "axios";

function FoodComboCard() {
    const [combos, setCombos] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/menu")
            .then(response => setCombos(response.data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            {combos.map((combo) => (
                <div key={combo._id} className="combo-card">
                    <h3>{combo.name}</h3>
                    <p>{combo.description}</p>
                    <button onClick={() => likeCombo(combo._id)}>👍 {combo.likes}</button>
                    <button onClick={() => dislikeCombo(combo._id)}>👎 {combo.dislikes}</button>
                </div>
            ))}
        </div>
    );
}

// Like a combo
const likeCombo = async (id) => {
    await axios.patch(`http://localhost:5000/api/menu/${id}/like`);
    window.location.reload(); // Refresh to update likes
};

// Dislike a combo
const dislikeCombo = async (id) => {
    await axios.patch(`http://localhost:5000/api/menu/${id}/dislike`);
    window.location.reload(); // Refresh to update dislikes

};

export default FoodComboCard;
