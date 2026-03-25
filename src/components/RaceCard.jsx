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
  const trackMapPath = `./media/track-maps/${circuitId}.svg`;

  return (
    <div className="bg-gray-800 rounded-xl p-4 text-white flex flex-col gap-4">
      <div className="p-2 flex justify-between text-md font-semibold tracking-widest gap-4">
        <span className="py-1 uppercase tracking-widest gap-4">
          {race.Circuit?.Location?.country}
        </span>
        <span className="bg-black px-2 py-1 rounded font-mono text-red-500 gap-4">
          {race.time?.slice(0, 5)} UTC
        </span>
      </div>

      <div className="relative h-60 overflow-hidden rounded-xl bg-gray-900 flex items-center justify-center">
        <img
          src={trackMapPath}
          alt={`${race.circuitName}track map`}
          className="md:block-full hover:scale-105 transition-transform duration-200 invert"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/media/track-maps/default.svg";
          }}
        />
        <div />
      </div>

      <div className=" px-2 flex flex-col gap-2">
        <h2 className="uppercase font-bold leading-tight text-red-500">
          {formatRaceWeekend(race.FirstPractice?.date, race.date)}
        </h2>
        <h2 className="text-2xl font-bold leading-tight">{race.raceName}</h2>
        <p>{race.Circuit?.circuitName}</p>
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
