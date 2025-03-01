import React from "react";
import "../styles/Card.css"; // Styling for cards

const FoodComboCard = ({ combo }) => {
  return (
    <div className="food-card">
      {combo.imageUrl && <img src={`http://localhost:5000${combo.imageUrl}`} alt={combo.name} />}
      <h3>{combo.name}</h3>
      <p>{combo.description}</p>
    </div>
  );
};

export default FoodComboCard;
