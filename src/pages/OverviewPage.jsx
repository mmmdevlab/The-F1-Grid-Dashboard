import { useState, useEffect } from "react";
import { getDriverStandings } from "../services/jolpi.js";
import { useFavourites } from "../context/FavouritesContext.jsx";
import DriverCard from "../components/DriverCard";
import StandingList from "../components/StandingList.jsx";
import WatchlistPanel from "../components/WatchlistPanel.jsx";
import NextRacePanel from "../components/NextRacePanel.jsx";

const OverviewPage = () => {
  const { favourites, removeFavourite } = useFavourites();
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDriverStandings()
      .then((data) => {
        setStandings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load standings", error);
        setLoading(false);
      });
  }, []);

  return (
    <main className="px-8 py-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Real-time insights for the entire grid
        </h1>
      </div>

      <section className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mb-4 grid-flow-row">
        <div className="lg:col-span-1 grid-flow-row">
          <NextRacePanel />
        </div>
        <div className="lg:col-span-1 justify-between">
          <StandingList standings={standings} />
        </div>
      </section>

      <section className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mb-4 grid-flow-row">
        <div>
          <WatchlistPanel />
        </div>

        <div className="rounded-xl p-6 border border-gray-200">
          <p className="text-xs font-semibold text-red-600 tracking-widest mb-4">
            MY TOP DRIVERS
          </p>

          {loading ? (
            <p className="text-gray-400">Loading your stars...</p>
          ) : favourites.length === 0 ? (
            <p className="text-gray-500 text-sm">No favourite drivers yet</p>
          ) : (
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {favourites.map((driver) => {
                const standingMatch = standings.find(
                  (s) => s.Driver.driverId === driver.driverId,
                );
                return (
                  <DriverCard
                    key={driver.driverId}
                    driver={driver}
                    points={standingMatch?.points ?? "—"}
                    position={standingMatch?.position ?? "—"}
                    isFavourite={true}
                    hideActions={true}
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
