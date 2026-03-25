import DriverCard from "./DriverCard";
import TeamCard from "./TeamCard";
import RaceCard from "./RaceCard";

const DreamTeamPreview = ({
  primaryDriver,
  secondaryDriver,
  constructor,
  circuit,
}) => {
  const hasAnySelection =
    primaryDriver || secondaryDriver || constructor || circuit;

  if (!hasAnySelection) {
    return (
      <p className="text-black text-sm">Select your picks from the form.</p>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
      <div>
        {primaryDriver ? (
          <DriverCard
            driver={primaryDriver}
            points="—"
            position="—"
            hideActions={true}
          />
        ) : (
          <p className="text-gray-500 text-sm">No primary driver selected</p>
        )}
      </div>

      <div>
        {secondaryDriver ? (
          <DriverCard
            driver={secondaryDriver}
            points="—"
            position="—"
            hideActions={true}
          />
        ) : (
          <p className="text-gray-500 text-sm">No secondary driver selected</p>
        )}
      </div>

      <div>
        {constructor ? (
          <TeamCard constructor={constructor} hideActions={true} />
        ) : (
          <p className="text-gray-500 text-sm">No team selected</p>
        )}
      </div>

      <div>
        {circuit ? (
          <RaceCard race={circuit} hideActions={true} />
        ) : (
          <p className="text-gray-500 text-sm">No track selected</p>
        )}
      </div>
    </div>
  );
};

export default DreamTeamPreview;
