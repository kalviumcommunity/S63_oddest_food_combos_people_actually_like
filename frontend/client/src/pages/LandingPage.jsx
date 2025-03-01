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
