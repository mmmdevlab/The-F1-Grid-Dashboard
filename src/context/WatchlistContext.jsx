import { createContext, useContext, useState, useEffect } from "react";
import { getRaces } from "../services/jolpi";
import {
  getWatchlist,
  addWatchlist as addWatchlistToAirtable,
  removeWatchlist as removeWatchlistFromAirtable,
} from "../services/airtable";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    Promise.all([getWatchlist(), getRaces()]).then(([records, allRaces]) => {
      if (!records || !allRaces) return;
      const loaded = records.map((record) => {
        const fullRace = allRaces.find(
          (r) => r.Circuit.circuitId === record.fields.circuitId,
        );
        return { ...fullRace, recordId: record.id };
      });
      setWatchlist(loaded);
      console.log("WatchlistContext: loaded", loaded);
    });
  }, []);

  const addToWatchlist = (race) => {
    addWatchlistToAirtable(race).then((record) => {
      if (!record) return;
      setWatchlist((prev) => [...prev, { ...race, recordId: record.id }]);
      console.log("Added to watchlist:", race.raceName);
    });
  };

  const removeFromWatchlist = (recordId) => {
    removeWatchlistFromAirtable(recordId);
    setWatchlist((prev) => prev.filter((r) => r.recordId !== recordId));
    console.log("Removed from watchlist:", recordId);
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
