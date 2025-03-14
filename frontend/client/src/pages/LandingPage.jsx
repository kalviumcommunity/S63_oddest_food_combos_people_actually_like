
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa"; // Icon for the button
import { MdFastfood } from "react-icons/md"; // Icon for food theme
import { AiFillHeart } from "react-icons/ai"; // Icon for footer love
import "../styles/LandingPage.css";


const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Header Section */}
      <header className="header">
        <h1>🍔 Weirdest Food Combos 🍦</h1>
      </header>

      {/* Main Content */}
      <main className="landing-main">
        <div className="landing-header">
          <MdFastfood className="food-icon" />
          <h2>Welcome to the Oddest Food Combos Collection! 🍕🍦</h2>
          <p>
            Have you ever mixed two unexpected ingredients and found it absolutely delicious?  
            **Now’s your chance to share your crazy food experiments with the world!** 🎉  
          </p>
        </div>

        {/* Add Combo Button */}
        <button className="add-combo-btn" onClick={() => navigate("/add-combo")}>
          <FaPlusCircle className="add-icon" /> Add Your Own Combo
        </button>

      </main>

      {/* Footer Section */}
      <footer className="footer">
        <p>Made with <AiFillHeart className="heart-icon" /> by Food Lovers</p>
      </footer>
    </div>
  );
};

export default LandingPage;

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

