import { useState, useEffect } from "react";
import { getDrivers, getConstructors, getRaces } from "../services/jolpi.js";
import { useDreamTeam } from "../context/DreamTeamContext";
import DreamTeamForm from "../components/DreamTeamForm";
import DreamTeamLogs from "../components/DreamTeamLogs";
import DreamTeamPreview from "../components/DreamTeamPreview";

const initialFormData = {
  primaryDriverId: "",
  secondaryDriverId: "",
  constructorId: "",
  circuitId: "",
};

const DreamTeamPage = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [drivers, setDrivers] = useState([]);
  const [constructors, setConstructors] = useState([]);
  const { teams, createTeam, updateTeam, deleteTeam } = useDreamTeam();
  const [races, setRaces] = useState([]);

  const [activeTeamId, setActiveTeamId] = useState(null);
  const activeTeam = teams.find((t) => t.id === activeTeamId);
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [saved, setSaved] = useState(false);

  const previewSource = editingTeamId
    ? formData
    : activeTeam
      ? activeTeam.fields
      : formData;

  const handleSelectTeam = (teamId) => {
    setActiveTeamId((prev) => (prev === teamId ? null : teamId));
  };
  const handleDeleteTeam = (teamId) => {
    deleteTeam(teamId);
    if (activeTeamId === teamId) setActiveTeamId(null);
  };
  useEffect(() => {
    getDrivers().then((data) => setDrivers(data));
    getConstructors().then((data) => setConstructors(data));
    getRaces().then((data) => setRaces(data));
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditTeam = (team) => {
    setEditingTeamId(team.id);
    setActiveTeamId(team.id);
    setFormData({
      primaryDriverId: team.fields.primaryDriverId ?? "",
      secondaryDriverId: team.fields.secondaryDriverId ?? "",
      constructorId: team.fields.constructorId ?? "",
      circuitId: team.fields.circuitId ?? "",
    });
  };

  const handleCancelEdit = () => {
    setEditingTeamId(null);
    setFormData(initialFormData);
  };

  const handleSubmit = () => {
    if (
      !formData.primaryDriverId ||
      !formData.secondaryDriverId ||
      !formData.constructorId ||
      !formData.circuitId
    ) {
      alert("Please select all four before saving.");
      return;
    }

    if (editingTeamId) {
      updateTeam(editingTeamId, formData);
      setEditingTeamId(null);
    } else {
      createTeam(formData);
    }
    setFormData(initialFormData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const selectedPrimary = drivers.find(
    (d) => d.driverId === previewSource.primaryDriverId,
  );
  const selectedSecondary = drivers.find(
    (d) => d.driverId === previewSource.secondaryDriverId,
  );
  const selectedConstructor = constructors.find(
    (c) => c.constructorId === previewSource.constructorId,
  );
  const selectedCircuit = races.find(
    (r) => r.Circuit.circuitId === previewSource.circuitId,
  );

  return (
    <main className="px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      <aside className="md:col-span-1 flex flex-col gap-6">
        <DreamTeamForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCancelEdit={handleCancelEdit}
          isEditing={!!editingTeamId}
          drivers={drivers}
          constructors={constructors}
          races={races}
        />
        <DreamTeamLogs
          teams={teams}
          activeTeamId={activeTeamId}
          onSelect={handleSelectTeam}
          onEdit={handleEditTeam}
          onDelete={handleDeleteTeam}
        />
      </aside>

      <section className="bg-gray-200 rounded-xl md:col-span-2 p-6 flex flex-col gap-4">
        <h3 className="text-xs font-bold tracking-widest text-red-600 uppercase">
          Your Dream Team
        </h3>
        {saved && (
          <h1 className="text-black text-4xl font-bold">
            Your team has been logged!
          </h1>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="col-span-full">
            <DreamTeamPreview
              primaryDriver={selectedPrimary}
              secondaryDriver={selectedSecondary}
              constructor={selectedConstructor}
              circuit={selectedCircuit}
              isSaved={saved}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default DreamTeamPage;
