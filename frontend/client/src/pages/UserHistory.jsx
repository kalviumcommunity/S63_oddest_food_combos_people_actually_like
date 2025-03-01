// import { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/Form.css";
// import "../styles/UserHistory.css";

// const UserHistory = () => {
//   const [combos, setCombos] = useState([]);

//   const fetchCombos = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/combos");
//       setCombos(response.data);
//     } catch (err) {
//       console.error("Error fetching combos:", err);
//     }
//   };

//   useEffect(() => {
//     fetchCombos();
//   }, []);

//   return (
//     <div className="history-container">
//       <h2>Food Combo History</h2>
//       {combos.length === 0 ? (
//         <p>No combos added yet!</p>
//       ) : (
//         combos.map((combo) => (
//           <div key={combo._id} className="combo-item">
//             <h3>{combo.name}</h3>
//             <p>{combo.description}</p>
//             {combo.imageUrl && <img src={combo.imageUrl} alt={combo.name} />}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default UserHistory;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPizzaSlice } from "react-icons/fa"; // Food Icon
import { MdFastfood } from "react-icons/md"; // Fast Food Icon
import { GiHotMeal } from "react-icons/gi"; // Meal Icon
import { AiFillClockCircle } from "react-icons/ai"; // Time Icon
import "../styles/UserHistory.css"

const UserHistory = () => {
  const [combos, setCombos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/combos")
      .then((response) => {
        setCombos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching food combos:", error);
      });
  }, []);

  return (
    <div className="history-container">
      <h2 className="history-title">
        <AiFillClockCircle className="history-icon" /> Food Combo History
      </h2>
      
      {combos.map((combo, index) => (
        <div key={index} className="combo-card">
          <MdFastfood className="combo-icon" />
          <div>
            <h3 className="combo-name">
              {combo.name} <FaPizzaSlice />
            </h3>
            <p className="combo-description">
              <GiHotMeal /> {combo.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserHistory;
