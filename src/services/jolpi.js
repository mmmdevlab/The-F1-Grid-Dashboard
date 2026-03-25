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
    const rawDrivers = data.MRData.DriverTable.Drivers;
    // console.log(`getDrivers: data got`, data);
    const drivers = rawDrivers.map((d) => ({
      driverId: d.driverId,
      givenName: d.givenName,
      familyName: d.familyName,
      code: d.code,
      permanentNumber: d.permanentNumber,
      nationality: d.nationality,
    }));
    return drivers.sort((a, b) => a.familyName.localeCompare(b.familyName));
  } catch (error) {
    console.log(`getDrivers error`, error.message);
    return [];
  }
};

/*---------------------------------------------------------------------------DRIVER STANDINGS */

export const getDriverStandings = async () => {
  // console.log(`getDriverStandings fetch`);
  try {
    const response = await fetch(
      `${BASE_URL}/2026/driverStandings.json?limit=10`,
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    // console.log(`getDriverStandings: data got`, data);
    const rawStandings =
      data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings ?? [];
    const standings = rawStandings.map((s) => ({
      position: s.position,
      points: s.points,
      wins: s.wins,
      Driver: {
        driverId: s.Driver.driverId,
        givenName: s.Driver.givenName,
        familyName: s.Driver.familyName,
        code: s.Driver.code,
        nationality: s.Driver.nationality,
      },
      Constructor: {
        constructorId: s.Constructors[0]?.constructorId,
        name: s.Constructors[0]?.name,
      },
    }));
    return standings;
  } catch (error) {
    console.log(`getDriverStandings error`, error.message);
    return [];
  }
};

/*---------------------------------------------------------------------------RACES */

export const getRaces = async () => {
  // console.log(`getRaces fetching`);
  try {
    const response = await fetch(`${BASE_URL}/2026/races.json`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    // console.log(`getRaces: data in`, data);
    const rawRaces = data.MRData.RaceTable.Races;
    const races = rawRaces.map((r) => ({
      round: r.round,
      raceName: r.raceName,
      date: r.date,
      time: r.time,
      FirstPractice: r.FirstPractice,
      Circuit: {
        circuitId: r.Circuit.circuitId,
        circuitName: r.Circuit.circuitName,
        Location: {
          country: r.Circuit.Location.country,
          locality: r.Circuit.Location.locality,
        },
      },
    }));
    return races;
  } catch (error) {
    console.log(`getRaces error:`, error.message);
    return [];
  }
};

/*---------------------------------------------------------------------------NEXT RACE */

export const nextRace = async () => {
  // console.log(`nextRace fetching`);
  try {
    const response = await fetch(`${BASE_URL}/2026/next.json`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    // console.log(`nextRace: data in`, data);
    const rawRaces = data.MRData.RaceTable.Races;
    const races = rawRaces.map((r) => ({
      round: r.round,
      raceName: r.raceName,
      date: r.date,
      time: r.time,
      Circuit: {
        circuitId: r.Circuit.circuitId,
        circuitName: r.Circuit.circuitName,
        Location: {
          country: r.Circuit.Location.country,
          locality: r.Circuit.Location.locality,
        },
      },
    }));

    return races && races.length > 0 ? races[0] : null;
  } catch (error) {
    console.log(`nextRace error:`, error.message);
    return null;
  }
};

/* TEAM stuff here */
/*---------------------------------------------------------------------------CONSTRUCTORS */

export const getConstructors = async () => {
  try {
    const response = await fetch(`${BASE_URL}/2026/constructors.json`);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    const data = await response.json();
    const rawConstructors = data.MRData.ConstructorTable.Constructors;
    const constructors = rawConstructors.map((c) => ({
      constructorId: c.constructorId,
      name: c.name,
      nationality: c.nationality,
    }));
    return constructors.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.log(`getConstructors error`, error.message);
    return [];
  }
};
