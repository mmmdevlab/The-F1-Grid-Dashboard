import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import OverviewPage from "./pages/OverviewPage.jsx";
import DriversPage from "./pages/DriversPage.jsx";
import DreamTeamPage from "./pages/DreamTeamPage.jsx";
import RacesPage from "./pages/RacesPage.jsx";

const App = () => {
  const [favourites, setFavourites] = useState([]);
  console.log("App rendered, favourites:", favourites);

  const addFavourite = (driver) => {
    setFavourites((prev) => [...prev, driver]);
    console.log("Added favourite:", driver.familyName);
  };

  const removeFavourite = (driverId) => {
    setFavourites((prev) => prev.filter((d) => d.driverId !== driverId));
    console.log("Removed favourite:", driverId);
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<OverviewPage favourites={favourites} />} />
        <Route
          path="/drivers"
          element={
            <DriversPage
              favourites={favourites}
              addFavourite={addFavourite}
              removeFavourite={removeFavourite}
            />
          }
        />
        <Route path="/dream-team" element={<DreamTeamPage />} />
        <Route path="/races" element={<RacesPage />} />
      </Routes>
    </>
  );
};

export default App;
