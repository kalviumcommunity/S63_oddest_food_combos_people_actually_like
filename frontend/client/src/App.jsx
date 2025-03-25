import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AddFoodCombo from "./pages/AddFoodCombo";
import UserHistory from "./pages/UserHistory";
import UpdateFoodCombo from "./pages/UpdateFoodCombo";
import FoodCombos from "./pages/FoodCombos"; // ✅ Import FoodCombos Page
import RegisterUser from "./pages/RegisterUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/add-combo" element={<AddFoodCombo />} />
        <Route path="/user-history" element={<UserHistory />} />
        <Route path="/update-food-combo/:id" element={<UpdateFoodCombo />} />
        <Route path="/food-combos" element={<FoodCombos />} /> {/* ✅ Added new route for Food Combos */}
        <Route path="/register" element={<RegisterUser />} />
      </Routes>
    </Router>
  );
}

export default App;
