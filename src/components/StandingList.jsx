const StandingList = ({ standings }) => {
  console.log(`StandingList`);

  return (
    <>
      <div className="rounded-xl p-6 border border-gray-200">
        <p className="text-xs font-semibold text-red-600 tracking-widest mb-4">
          TOP 10 DRIVER STANDINGS
        </p>
        {standings?.map((standing) => (
          <div
            key={standing.Driver.driverId}
            className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
          >
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm w-4">
                {standing.position}
              </span>
              <span className="font-semibold text-sm">
                {standing.Driver.givenName} {standing.Driver.familyName}
              </span>
            </div>
            <span className="font-bold text-sm">{standing.points}</span>
          </div>
        ))}
      </div>
    </>
  );
};
export default StandingList;
