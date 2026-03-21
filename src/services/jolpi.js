const BASE_URL = "https://api.jolpi.ca/ergast/f1";

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
  }
};

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
  }
};
