const BASE_URL = "https://api.airtable.com/v0";
const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;
const TABLE = "FavouriteDrivers";

/* Add / Get / remove Favourite Driver Actions */
export const getFavouriteDrivers = async () => {
  console.log("getFavouriteDrivers fetch");
  try {
    const response = await fetch(`${BASE_URL}/${BASE_ID}/${TABLE}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    console.log("getFavouriteDrivers: data received", data);
    return data.records;
  } catch (error) {
    console.error("getFavouriteDrivers error:", error.message);
  }
};

export const addFavouriteDriver = async (driver) => {
  console.log("addFavouriteDriver fetch", driver.familyName);
  try {
    const response = await fetch(`${BASE_URL}/${BASE_ID}/${TABLE}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          driverId: driver.driverId,
          driverFirstName: driver.givenName,
        },
        typecast: true,
      }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    console.log(`addFavouriteDriver: saved`, data);
    return data;
  } catch (error) {
    console.log(`addFavouriteDriver error:`, error.message);
  }
};

export const removeFavouriteDriver = async (recordId) => {
  console.log("removeFavouriteDriver: starting", recordId);
  try {
    const response = await fetch(
      `${BASE_URL}/${BASE_ID}/${TABLE}/${recordId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    console.log("removeFavouriteDriver: deleted from Airtable", data);
    return data;
  } catch (error) {
    console.error("removeFavouriteDriver error:", error.message);
  }
};
