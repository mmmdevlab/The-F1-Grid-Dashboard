import { Routes, Route } from "react-router-dom";
import OverviewPage from "./pages/OverviewPage.jsx";
import DriversPage from "./pages/DriversPage.jsx";
import DreamTeamPage from "./pages/DreamTeamPage.jsx";
import RacesPage from "./pages/RacesPage.jsx";
import NavBar from "./components/NavBar.jsx";

const App = () => {
  console.log("App rendered");
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/drivers" element={<DriversPage />} />
        <Route path="/dream-team" element={<DreamTeamPage />} />
        <Route path="/races" element={<RacesPage />} />
      </Routes>
    </>
  );
};

export default App;
