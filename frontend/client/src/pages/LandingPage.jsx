
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
  
// const LandingPage = () =>{
//     return(
//         <div style = {{ textAlign: 'center' , padding: '50px'}}>
//             <h1>Oddest food combos people actually like</h1>
//             <p>Peanut Butter and Pickles</p>
//             <p1>Pizza with Ketchup</p1>
            
//         </div>
//     )
// };
// export default LandingPage;
import React, { useEffect, useState } from "react";

const LandingPage = () => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/menu")
            .then((response) => response.json())
            .then((data) => setMenuItems(data))
            .catch((error) => console.error("Error fetching menu:", error));
    }, []);

    return (
        <div>
            <h1>Weirdest Food Combinations</h1>
            <ul>
                {menuItems.map((item) => (
                    <li key={item._id}>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>Votes: {item.votes}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LandingPage;

