import { DRIVER_COLOURS } from "../data/driverColours";

const DriverCard = ({
  driver,
  points,
  position,
  isFavourite,
  onAddFavourite,
  onRemoveFavourite,
  hideActions = false,
}) => {
  const cardColour = DRIVER_COLOURS[driver.driverId] ?? DRIVER_COLOURS.default;

  return (
    <div className={`rounded-xl p-4 ${cardColour} text-white`}>
      <div className="p-2 flex justify-between text-md font-semibold tracking-widest gap-4 mb-2">
        <span>{driver.code}</span>
        <span>{driver.permanentNumber}</span>
      </div>

      <div className="p-2 wrap-normal md:wrap-break-word">
        <h2 className="text-4xl">{driver.givenName}</h2>
        <h2 className="text-4xl font-bold leading-tight">
          {driver.familyName}
        </h2>
        <p className="mt-2">{driver.nationality}</p>
        <div className="relative w-full h-60 overflow-hidden rounded-xl">
          <img
            src={`/media/driver-img/${driver.driverId}.png`}
            alt={`${driver.familyName}`}
            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-200"
          />
        </div>
      </div>

      <div className="flex border-t border-white/10 pt-2 relative z-10">
        <div className="flex p-2 flex-col mb-4">
          <p className="flex justify-between text-xs font-semibold tracking-widest uppercase mb-2">
            POINTS
          </p>
          <h2 className="text-2xl font-bold">{points}</h2>
        </div>
        <div className="flex p-2 flex-col mb-4">
          <p className="flex justify-between text-xs font-semibold tracking-widest uppercase mb-2">
            POSITION
          </p>
          <h2 className="text-2xl font-bold">{position}</h2>
        </div>
      </div>
      {!hideActions && (
        <button
          onClick={isFavourite ? onRemoveFavourite : onAddFavourite}
          className={`w-full py-2 rounded-lg text-white text-sm font-medium ${
            isFavourite ? "bg-[#DC2626]" : "bg-[#16A34A]"
          }`}
        >
          {isFavourite ? "Remove" : "Add to favourites"}
        </button>
      )}
    </div>
  );
};

export default DriverCard;
