import { useWatchlist } from "../context/WatchlistContext.jsx";
import RaceCard from "./RaceCard";

const WatchlistPanel = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <section className="rounded-xl p-6 border border-gray-200">
      <h2 className="text-xs font-bold tracking-widest text-red-600 mb-4 uppercase">
        watchlist
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {watchlist.length === 0 ? (
          <p className="text-gray-500 text-sm col-span-full text-center gap-4 p-6 py-4">
            No races in the watchlist yet — add some from the schedule
          </p>
        ) : (
          watchlist.map((race) => (
            <RaceCard
              key={race.recordId}
              race={race}
              isOnWatchlist={true}
              onRemoveFromWatchlist={() => removeFromWatchlist(race.recordId)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default WatchlistPanel;
