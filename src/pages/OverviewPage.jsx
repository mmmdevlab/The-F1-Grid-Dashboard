import { useState, useEffect } from "react";
import { getDriverStandings } from "../services/jolpi";
import { useFavourites } from "../context/FavouritesContext.jsx";
import DriverCard from "../components/DriverCard";
import StandingList from "../components/StandingList.jsx";
import WatchlistPanel from "../components/WatchlistPanel.jsx";
import NextRacePanel from "../components/NextRacePanel.jsx";

const OverviewPage = () => {
  const { favourites, removeFavourite } = useFavourites();
  const [standings, setStandings] = useState([]);
  const [allStandings, setAllStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDriverStandings()
      .then((data) => {
        setStandings(data.slice(0, 10));
        setAllStandings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load standings", error);
        setLoading(false);
      });
  }, []);

  return (
    <main className="px-8 py-6">
      <h1 className="text-2xl font-bold mb-6">Overview Page</h1>

      <section className="grid xs:grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <NextRacePanel />
        <WatchlistPanel />
      </section>

      <section className="grid xs:grid-cols-2 sm:grid-cols-2 gap-4">
        <StandingList standings={standings} />

        <div className="rounded-xl p-6 border border-gray-200">
          <p className="text-xs font-semibold text-red-600 tracking-widest mb-4">
            MY TOP DRIVERS
          </p>
          {favourites.length === 0 ? (
            <p className="text-gray-500 text-sm">No favourite drivers yet</p>
          ) : (
            <div className="grid xs:grid-cols-1 md:grid-cols-2 gap-4">
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
