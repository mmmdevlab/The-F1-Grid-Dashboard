import { createContext, useContext, useState, useEffect } from "react";
import {
  getDreamTeam,
  createDreamTeam,
  editDreamTeam,
  removeDreamTeam,
} from "../services/airtable";

const DreamTeamContext = createContext();
export const useDreamTeam = () => useContext(DreamTeamContext);

export const DreamTeamProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);

  const loadTeams = async () => {
    const records = await getDreamTeam();
    if (records) setTeams(records);
  };

  useEffect(() => {
    // loadTeams();
  }, []);

  const createTeam = async (formData) => {
    const newRecord = await createDreamTeam(formData);
    if (newRecord && newRecord.id) {
      setTeams((prev) => [newRecord, ...prev]);
    } else {
      alert("Race Control: Data format error. Check console.");
    }
  };

  const updateTeam = async (recordId, formData) => {
    const updated = await editDreamTeam(recordId, formData);
    if (updated) {
      setTeams((prev) => prev.map((t) => (t.id === recordId ? updated : t)));
    }
  };

  const deleteTeam = async (recordId) => {
    await removeDreamTeam(recordId);
    setTeams((prev) => prev.filter((t) => t.id !== recordId));
  };

  return (
    <DreamTeamContext.Provider
      value={{ teams, createTeam, updateTeam, deleteTeam }}
    >
      {children}
    </DreamTeamContext.Provider>
  );
};

export default DreamTeamProvider;
