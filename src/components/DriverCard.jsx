const DriverCard = ({
  driver,
  points,
  position,
  isFavourite,
  onAddFavourite,
  onRemoveFavourite,
}) => {
  //   console.log("DriverCard rendered:", driver.familyName);
  return (
    <>
      <div className="rounded-xl p-4 bg-blue-950 text-white flex flex-col gap-2 min-h-64">
        <div className="flex justify-between text-xs opacity-60">
          <span>{driver.code}</span>
          <span>{driver.permanentNumber}</span>
        </div>

        <div className="flex-1">
          <h2 className="text-xl">{driver.givenName}</h2>
          <h2 className="text-xl font-bold leading-tight">
            {driver.familyName}
          </h2>
          <p className="text-xs opacity-60 mt-1">{driver.nationality}</p>
        </div>

        <div className="flex gap-6 text-xs border-t border-white/20 pt-2">
          <div>
            <p className="opacity-60">POINTS</p>
            <p className="font-bold">{points}</p>
          </div>
          <div>
            <p className="opacity-60">POSITION</p>
            <p className="font-bold">{position}</p>
          </div>
        </div>

        <button
          onClick={isFavourite ? onRemoveFavourite : onAddFavourite}
          className={`w-full py-2 rounded-lg text-white text-sm font-medium ${
            isFavourite ? "bg-[#DC2626]" : "bg-[#16A34A]"
          }`}
        >
          {isFavourite ? "Remove" : "Add to favourites"}
        </button>
      </div>
    </>
  );
};

export default DriverCard;
