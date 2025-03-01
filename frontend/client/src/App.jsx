import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddFoodCombo from "./pages/AddFoodCombo";
import UserHistory from "./pages/UserHistory";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "" element={<LandingPage />} />
        <Route path="/add-combo" element={<AddFoodCombo />} />
        <Route path="/history" element={<UserHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
