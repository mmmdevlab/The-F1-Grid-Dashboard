import { useWatchlist } from "../context/WatchlistContext";
import RaceCard from "./RaceCard";

const WatchlistPanel = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  console.log("WatchlistPanel rendered, watchlist:", watchlist);

  return (
    <section>
      <h2 className="text-l font-semibold tracking-widest text-center mb-4">
        WATCHLIST
      </h2>
      <div className="bg-gray-200 rounded-xl p-4 grid grid-cols-2 [grid-template-columns:repeat(auto-fill,minmax(250px,1fr))] gap-4">
        {watchlist.length === 0 ? (
          <p className="text-gray-500 text-sm col-span-full text-center py-4">
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
