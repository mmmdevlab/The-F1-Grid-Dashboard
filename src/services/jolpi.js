const BASE_URL = "https://api.jolpi.ca/ergast/f1";

/*---------------------------------------------------------------------------DRIVERS */

export const getDrivers = async () => {
  // console.log(`getDrivers fetch`);
  try {
    const response = await fetch(`${BASE_URL}/2026/drivers.json`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    // console.log(`getDrivers: data got`, data);
    return data.MRData.DriverTable.Drivers;
  } catch (error) {
    console.log(`getDrivers error`, error.message);
    return [];
  }
};

/*---------------------------------------------------------------------------DRIVER STANDINGS */

export const getDriverStandings = async () => {
  // console.log(`getDriverStandings fetch`);
  try {
    const response = await fetch(`${BASE_URL}/2026/driverStandings.json`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    // console.log(`getDriverStandings: data got`, data);
    return data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings ?? [];
  } catch (error) {
    console.log(`getDriverStandings error`, error.message);
    return [];
  }
};

/*---------------------------------------------------------------------------RACES */

export const getRaces = async () => {
  console.log(`getRaces fetching`);
  try {
    const response = await fetch(`${BASE_URL}/2026/races.json`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    console.log(`getRaces: data in`, data);
    return data.MRData.RaceTable.Races;
  } catch (error) {
    console.log(`getRaces error:`, error.message);
    return [];
  }
};

/*---------------------------------------------------------------------------NEXT RACE */

export const nextRace = async () => {
  console.log(`nextRace fetching`);
  try {
    const response = await fetch(`${BASE_URL}/current/next.json`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    console.log(`nextRace: data in`, data);
    const races = data.MRData.RaceTable.Races;
    return races && races.length > 0 ? races[0] : null;
  } catch (error) {
    console.log(`nextRace error:`, error.message);
    return null;
  }
};
