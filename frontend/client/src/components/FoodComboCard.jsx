import React from "react";
import { useNavigate } from "react-router-dom";

const FoodComboCard = ({ combo, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="food-combo-card">
      <h3>{combo.name}</h3>
      <p>{combo.description}</p>
      {combo.imageUrl && <img src={combo.imageUrl} alt={combo.name} />}
      <button onClick={() => navigate(`/update-food-combo/${combo._id}`)}>Edit</button>
      <button onClick={() => onDelete(combo._id)}>Delete</button>
    </div>
  );
};

export default FoodComboCard;
