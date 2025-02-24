// import LandingPage from "./pages/LandingPage";

import FoodComboCard from "./components/FoodComboCard";
import './App.css';


// function App() {
//     return <LandingPage />;
// }

function App() {
    const dummyCombo = {
        name: "Peanut Butter & Pickles",
        description: "A surprisingly tasty mix of nutty and tangy flavors.",
        votes: 42
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Weird Food Combos</h1>
            <FoodComboCard combo={dummyCombo} />
        </div>
    );
}




export default App;
