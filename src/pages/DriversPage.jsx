import { useState, useEffect } from "react";
import { getDrivers, getDriverStandings } from "../services/jolpi";
import DriverCard from "../components/DriverCard";

const DriversPage = ({ favourites, addFavourite, removeFavourite }) => {
  const [drivers, setDrivers] = useState([]);
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    getDrivers().then((data) => {
      setDrivers(data);
      // console.log("DriversPage: drivers set", data);
    });
    getDriverStandings().then((data) => {
      setStandings(data);
      // console.log("DriversPage: standings set", data);
    });
  }, []);

  const driversWithStandings = drivers.map((driver) => {
    const standing = standings.find(
      (s) => s.Driver.driverId === driver.driverId,
    );
    return {
      ...driver,
      points: standing?.points ?? "—",
      position: standing?.position ?? "—",
    };
  });

  return (
    <>
      <main className="px-8 py-6">
        <section className="mb-8">
          <h2 className="text-l font-semibold tracking-widest text-center mb-4">
            MY FAVOURITE DRIVERS
          </h2>
          <div className="bg-gray-100 rounded-xl p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 min-h-24">
            {favourites.length === 0 ? (
              <p className="text-gray-500 text-sm col-span-6 text-center py-4">
                No Favourite drivers yet - add some below
              </p>
            ) : (
              favourites.map((driver) => {
                const standing = standings.find(
                  (s) => s.Driver.driverId === driver.driverId,
                );
                return (
                  <DriverCard
                    key={driver.driverId}
                    driver={driver}
                    points={standing?.points ?? "—"}
                    position={standing?.position ?? "—"}
                    isFavourite={true}
                    onRemoveFavourite={() => removeFavourite(driver.driverId)}
                  />
                );
              })
            )}
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-l font-semibold tracking-widest text-center mb-4">
            ALL DRIVERS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {driversWithStandings.map((driver) => {
              const isFavourite = favourites.some(
                (f) => f.driverId === driver.driverId,
              );
              return (
                <DriverCard
                  key={driver.driverId}
                  driver={driver}
                  points={driver.points}
                  position={driver.position}
                  isFavourite={isFavourite}
                  onAddFavourite={() => addFavourite(driver)}
                  onRemoveFavourite={() => removeFavourite(driver.driverId)}
                />
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
};

export default DriversPage;
