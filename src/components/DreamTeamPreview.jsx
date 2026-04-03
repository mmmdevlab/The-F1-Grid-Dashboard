import DriverCard from "./DriverCard";
import TeamCard from "./TeamCard";
import RaceCard from "./RaceCard";
import { useDreamTeam } from "../context/DreamTeamContext";

const DreamTeamPreview = ({
  primaryDriver,
  secondaryDriver,
  constructor,
  circuit,
  isSaved,
}) => {
  const { standings = [] } = useDreamTeam();

  const getStanding = (driverId) =>
    standings.find((s) => s.Driver.driverId === driverId);

  const primaryStanding = primaryDriver
    ? getStanding(primaryDriver.driverId)
    : null;
  const secondaryStanding = secondaryDriver
    ? getStanding(secondaryDriver.driverId)
    : null;

  const hasAnySelection =
    primaryDriver || secondaryDriver || constructor || circuit;

  if (!hasAnySelection && !isSaved) {
    return (
      <h1 className="text-black text-xl animate-fade-in duration-500">
        Select your picks from the form.
      </h1>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
      <div>
        {primaryDriver ? (
          <DriverCard
            driver={primaryDriver}
            points={primaryStanding?.points ?? "—"}
            position={primaryStanding?.position ?? "—"}
            hideActions={true}
          />
        ) : (
          !isSaved && (
            <p className="text-gray-500 text-sm">No primary driver selected</p>
          )
        )}
      </div>

      <div>
        {secondaryDriver ? (
          <DriverCard
            driver={secondaryDriver}
            points={secondaryStanding?.points ?? "—"}
            position={secondaryStanding?.position ?? "—"}
            hideActions={true}
          />
        ) : (
          !isSaved && (
            <p className="text-gray-500 text-sm">
              No secondary driver selected
            </p>
          )
        )}
      </div>

      <div>
        {constructor ? (
          <TeamCard constructor={constructor} hideActions={true} />
        ) : (
          !isSaved && <p className="text-gray-500 text-sm">No team selected</p>
        )}
      </div>

      <div>
        {circuit ? (
          <RaceCard race={circuit} hideActions={true} ignorePast={true} />
        ) : (
          !isSaved && <p className="text-gray-500 text-sm">No track selected</p>
        )}
      </div>
    </div>
  );
};

export default DreamTeamPreview;
