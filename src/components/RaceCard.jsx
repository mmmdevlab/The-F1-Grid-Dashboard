const formatRaceWeekend = (startDateStr, endDateStr) => {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);

  const month = end.toLocaleString(`default`, { month: `short` }).toUpperCase();
  const startDay = start.getDate();
  const endDay = end.getDate();

  return `${startDay} - ${endDay} ${month}`;
};

const RaceCard = ({
  race,
  isOnWatchlist,
  onAddToWatchlist,
  onRemoveFromWatchlist,
  hideActions = false,
}) => {
  if (!race) return null;

  const circuitId = race.Circuit?.circuitId;
  const trackMapPath = `./src/assets/media/track-maps/${circuitId}.svg`;

  return (
    <div className="bg-gray-800 rounded-xl p-4 text-white flex flex-col gap-3">
      <div className="flex justify-between text-xs font-semibold tracking-widest uppercase">
        <span className="py-1">{race.Circuit?.Location?.country}</span>
        <span className="bg-black px-2 py-1 rounded font-mono text-red-500">
          {race.time?.slice(0, 5)} UTC
        </span>
      </div>

      <div className="relative w-50% h-50% overflow-hidden rounded-xl">
        <img
          src={trackMapPath}
          alt={`${race.Circuit.circuitName}track map`}
          className="flex justify-center content-center w-full h-full hover:scale-105 transition-transform duration-200"
          onError={(e) => (e.target.src = trackMapPath)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="uppercase text-md font-bold leading-tight text-red-500">
          {formatRaceWeekend(race.FirstPractice.date, race.date)}
        </h4>
        <h2 className="text-xl font-bold leading-tight">{race.raceName}</h2>
        <p className="text-xs">{race.Circuit.circuitName}</p>
      </div>

      {!hideActions && (
        <button
          onClick={isOnWatchlist ? onRemoveFromWatchlist : onAddToWatchlist}
          className={`w-full py-2 rounded-lg text-white text-sm font-medium ${
            isOnWatchlist ? "bg-[#DC2626]" : "bg-[#16A34A]"
          }`}
        >
          {isOnWatchlist ? `Remove` : `Add to watchlist`}
        </button>
      )}
    </div>
  );
};
export default RaceCard;
