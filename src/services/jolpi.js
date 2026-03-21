const BASE_URL = "https://api.jolpi.ca/ergast/f1";

export const getDrivers = async () => {
  console.log(`getDrivers fetch`);
  const response = await fetch(`${BASE_URL}/2026/drivers.json`);
  const data = await response.json();
  console.log(`getDrivers: data`, data);
  return data.MRData.DriverTable.Drivers;
};
