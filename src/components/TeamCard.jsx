import { TEAM_COLOURS } from "../data/teamColours";

const TeamCard = ({
  constructor,
  hideActions = false,
  isSelected,
  onSelect,
  onRemove,
}) => {
  const CardColour =
    TEAM_COLOURS[constructor.constructorId] ?? TEAM_COLOURS.default;
  return (
    <div className={`rounded-xl p-4 ${CardColour} text-white`}>
      {" "}
      <div className="p-2 uppercase flex justify-between text-md font-semibold tracking-widest gap-4 mb-2">
        <span>{constructor.nationality}</span>
        <img
          src={`./media/team-logos/${constructor.constructorId}.png`}
          alt={`${constructor.name} logo`}
          className="h-10 object-contain bg-black p-1 rounded-md"
        />
      </div>
      <div className="p-2 flex-1">
        <h2 className="text-4xl font-bold">{constructor.name}</h2>
        <img
          src={`./media/car-img/${constructor.constructorId}.png`}
          alt={`${constructor.name} car`}
          className="p-4 w-full object-contain my-2 hover:scale-105 transition-transform duration-200"
        />
      </div>
      {!hideActions && (
        <button
          onClick={isSelected ? onRemove : onSelect}
          className={`w-full py-2 rounded-lg text-white text-sm font-medium ${
            isSelected ? "bg-[#DC2626]" : "bg-[#16A34A]"
          }`}
        >
          {isSelected ? "Remove" : "Add to favourites"}
        </button>
      )}
    </div>
  );
};
export default TeamCard;
