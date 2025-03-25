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
};

export default FoodComboCard;
