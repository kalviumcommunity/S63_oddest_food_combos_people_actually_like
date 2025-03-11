


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AddFoodCombo from "./pages/AddFoodCombo";
import UserHistory from "./pages/UserHistory";
import UpdateFoodCombo from "./pages/UpdateFoodCombo"; // ✅ Import update page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/add-combo" element={<AddFoodCombo />} />
        <Route path="/user-history" element={<UserHistory />} />
        <Route path="/update-food-combo/:id" element={<UpdateFoodCombo />} /> {/* ✅ Add update route */}
      </Routes>
    </Router>
  );
}

export default App;

// import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
//import FoodComboCard from "./components/FoodComboCard";
import './App.css';


// function App() {
//     return <LandingPage />;
// }

// function App() {
//     const dummyCombo = {
//         name: "Peanut Butter & Pickles",
//         description: "A surprisingly tasty mix of nutty and tangy flavors.",
//         votes: 42
//     };

//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold">Weird Food Combos</h1>
//             <FoodComboCard combo={dummyCombo} />
//         </div>
//     );
// }




// export default App;


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
            </Routes>
        </Router>
    );
}

export default App;
