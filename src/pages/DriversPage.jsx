import { useState, useEffect } from "react";
import { getDrivers } from "../services/jolpi";
import DriverCard from "../components/DriverCard";

const DriversPage = ({ favourites, addFavourite, removeFavourite }) => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    getDrivers().then((data) => {
      setDrivers(data);
      console.log("DriversPage: drivers set in state", data);
    });
  }, []);

  return (
    <>
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold mb-6">Drivers Page</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {drivers.map((driver) => {
            const isFavourite = favourites.some(
              (f) => f.driverId === driver.driverId,
            );
            return (
              <DriverCard
                key={driver.driverId}
                driver={driver}
                isFavourite={isFavourite}
                onAddFavourite={() => addFavourite(driver)}
                onRemoveFavourite={() => removeFavourite(driver.driverId)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DriversPage;
