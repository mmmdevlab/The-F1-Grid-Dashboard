const StandingList = ({ standings }) => {
  console.log(`StandingList`);

  return (
    <div className="rounded-xl p-6 border border-gray-200">
      <p className="text-xs font-semibold text-red-600 tracking-widest mb-4">
        TOP 5 DRIVER STANDINGS
      </p>
      {standings?.map((standing) => (
        <div
          key={standing.Driver.driverId}
          className="grid items-center gap-2 py-2.5 border-b border-gray-100 last:border-0"
          style={{ gridTemplateColumns: "280px 1fr 1px 45px" }}
        >
          <div className="flex items-center gap-4 p-2">
            <span className="text-red-500 font-semibold text-sm w-4">
              {standing.position}
            </span>
            <span className="font-semibold text-xl">
              {standing.Driver.givenName} {standing.Driver.familyName}
            </span>
          </div>
          <span className="text-gray-400 text-sm">
            {standing.Constructor.name}
          </span>
          <span className="font-bold text-base text-right">
            {standing.points}
          </span>
        </div>
      ))}
    </div>
  );
};
export default StandingList;
