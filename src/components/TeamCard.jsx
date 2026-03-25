const TeamCard = ({
  constructor,
  hideActions = false,
  isSelected,
  onSelect,
  onRemove,
}) => {
  return (
    <div className="rounded-xl p-4 bg-black text-white flex flex-col gap-2 ">
      <div className="flex justify-between text-xs opacity-60">
        <span className="uppercase tracking-widest">{constructor.name}</span>
        <img
          src={`src/assets/media/team-logos/${constructor.constructorId}.png`}
          alt={`${constructor.name} logo`}
          className="h-6 object-contain bg-black p-1 rounded-md"
        />
      </div>

      <div className="flex-1">
        <h2 className="text-xl font-bold leading-tight">{constructor.name}</h2>
        <img
          src={`src/assets/media/car-img/${constructor.constructorId}.png`}
          alt={`${constructor.name} car`}
          className="h-16 w-full object-contain my-2"
        />
        <p className="text-xs opacity-60 mt-1">{constructor.nationality}</p>
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
