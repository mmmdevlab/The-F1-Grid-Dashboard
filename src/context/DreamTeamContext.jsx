import { createContext, useContext, useState, useEffect } from "react";
import {
  getDreamTeam,
  createDreamTeam,
  editDreamTeam,
  removeDreamTeam,
} from "../services/airtable";
import { getDriverStandings } from "../services/jolpi";

const DreamTeamContext = createContext();

export const DreamTeamProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    getDreamTeam().then((records) => {
      if (records) setTeams(records);
    });
    getDriverStandings().then(setStandings);
  }, []);

  const createTeam = async (formData) => {
    const newRecord = await createDreamTeam(formData);
    if (newRecord?.id) {
      setTeams((prev) => [newRecord, ...prev]);
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
      value={{ teams, createTeam, updateTeam, deleteTeam, standings }}
    >
      {children}
    </DreamTeamContext.Provider>
  );
};

export const useDreamTeam = () => useContext(DreamTeamContext);
