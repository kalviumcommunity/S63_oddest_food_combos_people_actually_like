const FoodComboCard = ({ combo }) => {
    return (
        <div className="food-combo-card">
            <h2>{combo.name}</h2>
            <p>{combo.description}</p>
            <p className="votes">Votes: {combo.votes}</p>
        </div>
    );
};

export default FoodComboCard;