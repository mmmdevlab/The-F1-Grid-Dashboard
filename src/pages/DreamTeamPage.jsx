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
  const [drivers, setDrivers] = useState([]);
  const [constructors, setConstructors] = useState([]);
  const [races, setRaces] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [editingTeamId, setEditingTeamId] = useState(null);

  const { teams, createTeam, updateTeam, deleteTeam } = useDreamTeam();

  const [activeTeamId, setActiveTeamId] = useState(null);

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
    setActiveTeamId(team.id); // also highlight it in the logs
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
      alert("Please select all four picks before saving.");
      return;
    }

    if (editingTeamId) {
      updateTeam(editingTeamId, formData);
      setEditingTeamId(null);
    } else {
      createTeam(formData);
    }
    setFormData(initialFormData);
  };

  const selectedPrimary = drivers.find(
    (d) => d.driverId === formData.primaryDriverId,
  );
  const selectedSecondary = drivers.find(
    (d) => d.driverId === formData.secondaryDriverId,
  );
  const selectedConstructor = constructors.find(
    (c) => c.constructorId === formData.constructorId,
  );
  const selectedCircuit = races.find(
    (r) => r.Circuit.circuitId === formData.circuitId,
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
        <div className="grid auto-cols-max grid-flow-col gap-4">
          <DreamTeamPreview
            primaryDriver={selectedPrimary}
            secondaryDriver={selectedSecondary}
            constructor={selectedConstructor}
            circuit={selectedCircuit}
          />
        </div>
      </section>
    </main>
  );
};

export default DreamTeamPage;

/**lassName="md:col-span-2 bg-gray-900 rounded-3xl p-8 flex flex-col gap-6 shadow-2xl border border-white/5" */
