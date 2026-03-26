import { useState, useEffect } from "react";
import { getDrivers, getDriverStandings } from "../services/jolpi.js";
import { useFavourites } from "../context/FavouritesContext.jsx";
import DriverCard from "../components/DriverCard";
import { getWatchlist } from "../services/airtable.js";

const DriversPage = () => {
  const { favourites, addFavourite, removeFavourite } = useFavourites();
  const [drivers, setDrivers] = useState([]);
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    getWatchlist().then((data) => {
      console.log(`Watchlist records:`, data);
    });
    getDrivers().then((data) => {
      setDrivers(data);
    });
    getDriverStandings().then((data) => {
      setStandings(data);
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
          <h2 className="text-xs font-bold text-center tracking-widest text-red-600 mb-4 uppercase">
            MY FAVOURITE DRIVERS
          </h2>
          <div className="rounded-xl p-6 border border-gray-200 bg-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4 min-h-24">
            {favourites.length === 0 ? (
              <p className="text-gray-200 text-sm col-span-6 text-center py-4">
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
          <h2 className="text-xs font-bold text-center tracking-widest text-red-600 mb-4 uppercase">
            ALL DRIVERS
          </h2>
          <div className="rounded-xl p-6 border border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4">
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
