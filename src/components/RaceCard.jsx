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
}) => {
  console.log(`RaceCard rendered`);

  return (
    <div className="bg-gray-800 rounded-xl p-4 text-white flex flex-col gap-3">
      <div className="flex justify-between text-xs opacity-60">
        <span>{race.Circuit.Location.country}</span>
        <span>{race.time.slice(0, -1)} UTC</span>
      </div>
      <div className="w-full h-20 bg-gray-900 rounded-lg flex items-center justify-center">
        <span className="text-gray-500 text-xs">Map To update later</span>
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="text-base font-light leading-tight">
          {formatRaceWeekend(race.FirstPractice.date, race.date)}
        </h4>
        <h2 className="text-base font-bold leading-tight">{race.raceName}</h2>
        <p className="text-xs opacity-80">{race.Circuit.circuitName}</p>
      </div>
      <button
        onClick={isOnWatchlist ? onRemoveFromWatchlist : onAddToWatchlist}
        className={`w-full py-2 rounded-lg text-white text-sm font-medium ${
          isOnWatchlist ? "bg-[#DC2626]" : "bg-[#16A34A]"
        }`}
      >
        {isOnWatchlist ? `Remove from watchlist` : `Add to watchlist`}
      </button>
    </div>
  );
};
export default RaceCard;
