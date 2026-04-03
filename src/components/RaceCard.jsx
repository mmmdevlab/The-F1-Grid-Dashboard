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
  ignorePast = false,
}) => {
  if (!race) return null;

  const isPast = ignorePast ? false : new Date(race.date) < new Date();

  const circuitId = race.Circuit?.circuitId;
  const trackMapPath = `./media/track-maps/${circuitId}.svg`;

  return (
    <div
      className={`rounded-xl p-4 text-white flex flex-col gap-4 grid-flow-row ${
        isPast ? "bg-black" : "bg-gray-800"
      }`}
    >
      <div className="p-2 flex justify-between text-md font-semibold tracking-widest gap-4 wrap-anywhere">
        <span className="py-1 uppercase tracking-widest gap-4">
          {race.Circuit?.Location?.country}
        </span>
        <span
          className={`bg-black px-2 py-1 rounded font-mono gap-4 ${
            isPast ? "text-gray-700" : "text-red-500"
          }`}
        >
          {race.time?.slice(0, 5)} UTC
        </span>
      </div>

      <div className="overflow-hidden w-auto relative h-60 rounded-xl bg-gray-900 flex items-center justify-center">
        <img
          src={trackMapPath}
          alt={`${race.circuitName} track map`}
          className={`block-full hover:scale-105 transition-transform duration-200 ${
            isPast ? "invert opacity-20" : "invert"
          }`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/media/track-maps/default.svg";
          }}
        />
        <div />
      </div>

      <div className="px-2 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h2
            className={`uppercase font-bold leading-tight ${
              isPast ? "text-gray-500" : "text-red-500"
            }`}
          >
            {formatRaceWeekend(race.FirstPractice?.date, race.date)}
          </h2>
          {isPast && (
            <span className="text-xs tracking-widest text-gray-600 uppercase">
              · Finished
            </span>
          )}
        </div>
        <h2 className="text-2xl font-bold leading-tight">{race.raceName}</h2>
        <p className={isPast ? "text-gray-600" : ""}>
          {race.Circuit?.circuitName}
        </p>
      </div>

      {!hideActions && !isPast && (
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
