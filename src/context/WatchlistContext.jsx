// WatchlistContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { getRaces } from "../services/jolpi.js";
import {
  getWatchlist,
  addWatchlist as addWatchlistToAirtable,
  removeWatchlist as removeWatchlistFromAirtable,
} from "../services/airtable.js";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    Promise.all([getWatchlist(), getRaces()]).then(([records, allRaces]) => {
      if (!records || !allRaces) return;

      // Debug: confirm what you're working with
      console.log("Airtable watchlist records:", records);
      console.log("Sample race from Jolpi:", allRaces[0]);

      const loaded = records
        .map((record) => {
          const fullRace = allRaces.find(
            (r) =>
              String(r.Circuit?.circuitId) === String(record.fields.circuitId),
          );

          if (!fullRace) {
            console.warn("No matching race found for record:", record.fields);
            return null;
          }

          return { ...fullRace, recordId: record.id };
        })
        .filter(Boolean);

      setWatchlist(loaded);
    });
  }, []);

  const addToWatchlist = (race) => {
    const alreadyAdded = watchlist.some(
      (r) => r.Circuit?.circuitId === race.Circuit?.circuitId,
    );
    if (alreadyAdded) return;

    addWatchlistToAirtable(race).then((record) => {
      if (!record) return;
      setWatchlist((prev) => [...prev, { ...race, recordId: record.id }]);
    });
  };

  const removeFromWatchlist = async (recordId) => {
    const deleted = await removeWatchlistFromAirtable(recordId);
    if (deleted) {
      setWatchlist((prev) => prev.filter((r) => r.recordId !== recordId));
    }
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
