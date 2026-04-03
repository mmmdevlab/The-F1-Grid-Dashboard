import { useState, useEffect } from "react";
import { nextRace } from "../services/jolpi.js";
import CountDownRace from "./CountDownRace";

const NextRacePanel = () => {
  const [nextRaceData, setNextRaceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    nextRace()
      .then((data) => {
        setNextRaceData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching next race:", error);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date
      .toLocaleString("default", { month: "short" })
      .toUpperCase();
    return `${day} ${month}`;
  };

  const raceDateTimeString =
    nextRaceData?.date && nextRaceData?.time
      ? `${nextRaceData.date}T${nextRaceData.time}`
      : null;

  return (
    <section className="rounded-xl p-6 border border-gray-200">
      <h2 className="text-xs font-bold tracking-widest text-red-600 mb-4 uppercase">
        Next Race
      </h2>

      <div className="bg-gradient-to-b from-black to-red-500 rounded-xl p-6 min-h-[200px]">
        {nextRaceData ? (
          <div>
            <div className="mt-2 flex gap-4 text-md font-mono text-white">
              <span className="bg-red-500 px-2 py-1 rounded">
                {formatDate(nextRaceData.date)}
              </span>
              <span className="bg-red-500 px-2 py-1 rounded">
                {nextRaceData.time?.slice(0, 5)} UTC
              </span>
            </div>
            <h1 className="text-white text-5xl pt-3 font-bold">
              {nextRaceData.raceName}
            </h1>
            <p className="text-white text-xl pt-6">
              {nextRaceData.Circuit.circuitName}
            </p>
          </div>
        ) : (
          <p className="text-white text-2xl ">
            {loading
              ? "Loading track data..."
              : "No upcoming race data available"}
          </p>
        )}

        {raceDateTimeString && (
          <div className="mt-8 flex gap-4 text-3xl font-mono text-white">
            <span>
              <CountDownRace raceDate={raceDateTimeString} />
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default NextRacePanel;
