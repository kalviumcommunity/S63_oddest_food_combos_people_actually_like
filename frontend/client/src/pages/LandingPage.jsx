const LandingPage = () => {
    const foodCombos = [
      "Peanut Butter and Pickles",
      "Pizza with Ketchup",
      "Fries Dipped in Milkshake",
      "Banana and Mayonnaise Sandwich",
      "Watermelon and Feta Cheese",
    ];
  
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1>Oddest Food Combos People Actually Like</h1>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {foodCombos.map((combo, index) => (
            <li key={index} style={{ fontSize: "18px", margin: "10px 0" }}>
              {combo}
            </li>
          ))}
        </ul>
        <button 
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#ff6347",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Add Your Own Combo
        </button>
      </div>
    );
  };
  
  export default LandingPage;
  