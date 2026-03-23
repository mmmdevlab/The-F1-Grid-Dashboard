import { useState, useEffect } from "react";
import { nextRace } from "../services/jolpi";

const NextRacePanel = () => {
  const [nextRaceData, setNextRaceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    nextRace()
      .then((data) => {
        setNextRaceData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching next race:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section>
      <h2 className="text-l font-semibold tracking-widest text-center mb-4 uppercase">
        next race
      </h2>
      <div className="bg-gray-800 rounded-xl p-6 min-h-[160px] flex flex-col justify-center shadow-lg">
        {nextRaceData ? (
          <div>
            <h3 className="text-white text-xl font-bold">
              {nextRaceData.raceName}
            </h3>
            <p className="text-gray-300">{nextRaceData.Circuit.circuitName}</p>
            <div className="mt-4 flex gap-4 text-sm font-mono text-red-400">
              <span className="bg-red-900/30 px-2 py-1 rounded">
                {nextRaceData.date}
              </span>
              <span className="bg-red-900/30 px-2 py-1 rounded">
                {nextRaceData.time?.replace("Z", " UTC")}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-white opacity-50 italic">
            {loading
              ? "Loading track data..."
              : "No upcoming race data available"}
          </p>
        )}
        <br />
        <div>
          <p className="text-white text-sm font-medium uppercase">Weather</p>
        </div>
      </div>
    </section>
  );
};

export default NextRacePanel;
