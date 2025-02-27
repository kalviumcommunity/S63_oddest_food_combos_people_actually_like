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
