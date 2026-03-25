const DreamTeamLogs = ({
  teams = [],
  activeTeamId,
  onSelect,
  onEdit,
  onDelete,
}) => {
  console.log("DreamTeamLogs: teams received", teams);

  return (
    <section className="bg-white rounded-2xl p-6 flex flex-col gap-4 border border-gray-200">
      <h3 className="text-xs font-bold tracking-widest text-red-600 uppercase">
        Your Logs
      </h3>

      <div className="flex flex-col gap-2">
        {teams.length === 0 ? (
          <p className="text-gray-400 text-sm">No teams saved yet</p>
        ) : (
          teams.map((team) => {
            const isActive = activeTeamId === team.id;

            const rawDate =
              team.fields?.createdAt ?? team.fields?.Created ?? null;

            const savedDate = rawDate
              ? new Date(rawDate).toLocaleDateString()
              : team.id.slice(0, 8);

            return (
              <div
                key={team.id}
                onClick={() => onSelect(team.id)}
                className={`group flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  isActive
                    ? "bg-red-600 border-red-500 text-white"
                    : "bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold"> Log {savedDate}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(team);
                    }}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isActive
                        ? "hover:bg-white/20 text-white"
                        : "hover:bg-gray-200 text-gray-400"
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">
                      edit
                    </span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(team.id);
                    }}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isActive
                        ? "hover:bg-white/20 text-white"
                        : "hover:bg-red-100 hover:text-red-600 text-gray-400"
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">
                      delete
                    </span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default DreamTeamLogs;
