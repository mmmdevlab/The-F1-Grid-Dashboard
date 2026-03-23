import { useState, useEffect } from "react";
import { getRaces } from "../services/jolpi";
import { useWatchlist } from "../context/WatchlistContext.jsx";
import RaceCard from "../components/RaceCard";
import WatchlistPanel from "../components/WatchlistPanel";

const RacesPage = () => {
  const [races, setRaces] = useState([]);
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  useEffect(() => {
    getRaces().then((data) => {
      setRaces(data);
      console.log(`RacesPage: races`, data);
    });
  }, []);

  return (
    <main className="px-8 py-6">
      <section className="mb-8">
        <WatchlistPanel />
      </section>

      <section className="mb-8">
        <h2 className="text-l font-semibold tracking-widest text-center mb-4">
          SCHEDULE
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {races.map((race) => {
            const isOnWatchlist = watchlist.some(
              (w) => w?.Circuit?.circuitId === race.Circuit.circuitId,
            );
            return (
              <RaceCard
                key={race.round}
                race={race}
                isOnWatchlist={isOnWatchlist}
                onAddToWatchlist={() => addToWatchlist(race)}
                onRemoveFromWatchlist={() => {
                  const watched = watchlist.find(
                    (w) => w?.Circuit?.circuitId === race.Circuit.circuitId,
                  );
                  if (watched) removeFromWatchlist(watched.recordId);
                }}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default RacesPage;
