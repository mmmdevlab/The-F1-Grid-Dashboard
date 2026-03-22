import { createContext, useContext, useState, useEffect } from "react";
import { getDrivers } from "../services/jolpi.js";
import {
  getFavouriteDrivers,
  addFavouriteDriver,
  removeFavouriteDriver,
} from "../services/airtable.js";

const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  console.log("FavouritesProvider rendered, favourites:", favourites);

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
        console.log(
          "FavouritesProvider: favourite loaded from Airtable",
          loaded,
        );
      },
    );
  }, []);

  const addFavourite = (driver) => {
    addFavouriteDriver(driver).then((record) => {
      if (!record) return;
      setFavourites((prev) => [...prev, { ...driver, recordId: record.id }]);
      console.log(`Added favourite:`, driver.familyName);
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
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);
