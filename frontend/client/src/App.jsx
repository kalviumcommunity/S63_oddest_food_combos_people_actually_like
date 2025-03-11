// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AddFoodCombo from "./pages/AddFoodCombo";
// import UserHistory from "./pages/UserHistory";
// import LandingPage from "./pages/LandingPage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path = "" element={<LandingPage />} />
//         <Route path="/add-combo" element={<AddFoodCombo />} />
//         <Route path="/history" element={<UserHistory />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

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
