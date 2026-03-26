const StandingList = ({ standings }) => {
  return (
    <div className="overflow-auto rounded-xl p-6 border border-gray-200">
      <p className="text-xs font-semibold text-red-600 tracking-widest mb-4 uppercase">
        TOP 5 DRIVER STANDINGS
      </p>
      {standings?.slice(0, 5).map((standing) => (
        <div
          key={standing.Driver.driverId}
          className="grid grid-cols-[28px_minmax(0,1.4fr)_minmax(0,1fr)_56px] items-center gap-4 py-4 border-b border-gray-100 last:border-0"
        >
          <div className="text-red-500 font-semibold text-sm">
            {standing.position}
          </div>
          <div className="font-semibold text-xl truncate">
            {standing.Driver.givenName} {standing.Driver.familyName}
          </div>
          <div className="text-gray-400 truncate">
            {standing.Constructor.name}
          </div>
          <div className="justify-self-end w-14 text-left font-bold text-base">
            {standing.points}
          </div>
        </div>
      ))}
    </div>
  );
};
export default StandingList;
