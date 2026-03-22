import { useState, useEffect } from "react";
import { getDriverStandings, getRaces } from "../services/jolpi";
import { useFavourites } from "../context/FavouritesContext.jsx";
import DriverCard from "../components/DriverCard";
import StandingList from "../components/StandingList.jsx";

const OverviewPage = () => {
  const { favourites, removeFavourite } = useFavourites();
  const [standings, setStandings] = useState([]);
  const [allStandings, setAllStandings] = useState([]);

  useEffect(() => {
    getRaces();
    getDriverStandings().then((data) => {
      setStandings(data.slice(0, 10));
      setAllStandings(data);
      console.log("OverviewPage standings", data);
    });
  }, []);

  return (
    <main className="px-8 py-6">
      <h1 className="text-2xl font-bold mb-6">Overview Page</h1>

      <section className="grid xs:grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-900 rounded-xl p-6">
          <p className="text-xs font-semibold text-white tracking-widest mb-4">
            NEXT RACE
          </p>
          <p className="text-white">Next race data coming soon</p>
        </div>
        <div className="bg-gray-900 rounded-xl p-6">
          <p className="text-xs font-semibold text-white tracking-widest mb-4">
            WATCHLIST RACES
          </p>
          <p className="text-white">Watchlist coming soon</p>
        </div>
      </section>

      <section className="grid xs:grid-cols-1 sm:grid-cols-2 gap-4">
        <StandingList standings={standings} />

        <div className="rounded-xl p-6 border border-gray-200">
          <p className="text-xs font-semibold text-red-600 tracking-widest mb-4">
            MY TOP DRIVERS
          </p>
          {favourites.length === 0 ? (
            <p className="text-gray-500 text-sm">No favourite drivers yet</p>
          ) : (
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 gap-4">
              {favourites.map((driver) => {
                const standing = allStandings.find(
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
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default OverviewPage;
