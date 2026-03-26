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

  useEffect(() => {
    Promise.all([getFavouriteDrivers(), getDrivers()]).then(
      ([records, allDrivers]) => {
        if (!records || !allDrivers) return;
        const loaded = records
          .map((record) => {
            const fullDriver = allDrivers.find(
              (d) => d.driverId === record.fields.driverId,
            );
            if (!fullDriver) return null;
            return { ...fullDriver, recordId: record.id };
          })
          .filter(Boolean);
        setFavourites(loaded);
      },
    );
  }, []);

  const addFavourite = async (driver) => {
    const record = await addFavouriteDriver(driver);
    if (!record) return;
    setFavourites((prev) => [...prev, { ...driver, recordId: record.id }]);
  };

  const removeFavourite = async (driverId) => {
    const driver = favourites.find((d) => d.driverId === driverId);
    if (!driver?.recordId) return;
    const deleted = await removeFavouriteDriver(driver.recordId);
    if (deleted) {
      setFavourites((prev) => prev.filter((d) => d.driverId !== driverId));
    }
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
