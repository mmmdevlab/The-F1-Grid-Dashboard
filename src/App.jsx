import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import OverviewPage from "./pages/OverviewPage.jsx";
import DriversPage from "./pages/DriversPage.jsx";
import DreamTeamPage from "./pages/DreamTeamPage.jsx";
import RacesPage from "./pages/RacesPage.jsx";
import { getDrivers } from "./services/jolpi.js";
import {
  getFavouriteDrivers,
  addFavouriteDriver,
  removeFavouriteDriver,
} from "./services/airtable.js";

const App = () => {
  const [favourites, setFavourites] = useState([]);
  console.log("App rendered, favourites:", favourites);

  useEffect(() => {
    Promise.all([getFavouriteDrivers(), getDrivers()]).then(
      ([records, allDrivers]) => {
        if (!records || !allDrivers) return;
        const loaded = records.map((record) => {
          const fullDriver = allDrivers.find(
            (d) => d.driverId === record.fields.driverId,
          );
          return { ...fullDriver, recordId: record.id };
        });
        setFavourites(loaded);
        console.log("App: favourites loaded from Airtable", loaded);
      },
    );
  }, []);

  const addFavourite = (driver) => {
    addFavouriteDriver(driver).then((record) => {
      setFavourites((prev) => [...prev, { ...driver, recordId: record.id }]);
      console.log(
        "Added favourite:",
        driver.familyName,
        "recordId:",
        record.id,
      );
    });
  };

  const removeFavourite = (driverId) => {
    const driver = favourites.find((d) => d.driverId === driverId);
    if (driver?.recordId) {
      removeFavouriteDriver(driver.recordId);
    }
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
