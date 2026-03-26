const BASE_URL = "https://api.airtable.com/v0";
const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;
const WATCHLIST_TABLE_ID = "tblnEweSM5lqG0mnC";
const DREAMTEAM_TABLE = "DreamTeam";
const DREAMTEAM_TABLE_ID = "tbl27MKRiRItWd5bv";
const FAVOURITEDRIVER_TABLE_ID = "tblvEY5PzqjHfxqff";

/* FavouriteDriver stuff here */

/*---------------------------------------------------------------------------GET */

export const getFavouriteDrivers = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/${BASE_ID}/${FAVOURITEDRIVER_TABLE_ID}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data.records;
  } catch (error) {
    console.error(`getFavouriteDrivers error:`, error.message);
  }
};

/*---------------------------------------------------------------------------POST */

export const addFavouriteDriver = async (driver) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${BASE_ID}/${FAVOURITEDRIVER_TABLE_ID}`,
      {
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
      },
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`addFavouriteDriver error:`, error.message);
  }
};

/*---------------------------------------------------------------------------DELETE */

export const removeFavouriteDriver = async (recordId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${BASE_ID}/${FAVOURITEDRIVER_TABLE_ID}/${recordId}`,
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

    return data.deleted;
  } catch (error) {
    console.error("removeFavouriteDriver error:", error.message);
  }
};

/* Watchlist stuff here */

/*---------------------------------------------------------------------------GET */

export const getWatchlist = async () => {
  // console.log(`getWatchlist: fetching`);
  try {
    const response = await fetch(
      `${BASE_URL}/${BASE_ID}/${WATCHLIST_TABLE_ID}?maxRecords=4`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data.records;
  } catch (error) {
    console.error(`getWatchlist error:`, error.message);
  }
};

/*---------------------------------------------------------------------------CREATE */

export const addWatchlist = async (race) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${BASE_ID}/${WATCHLIST_TABLE_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            circuitId: race.Circuit.circuitId,
            raceName: race.raceName,
          },
          typecast: true,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`addWatchlist error:`, error.message);
  }
};

/*---------------------------------------------------------------------------DELETE */

export const removeWatchlist = async (recordId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${BASE_ID}/${WATCHLIST_TABLE_ID}/${recordId}`,
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
    return data.deleted;
  } catch (error) {
    console.error(`removeWatchlist error:`, error.message);
  }
};

/* Dream Team stuff here */
/*---------------------------------------------------------------------------GET */

export const getDreamTeam = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/${BASE_ID}/${DREAMTEAM_TABLE_ID}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data.records;
  } catch (error) {
    console.error(`getDreamTeam error:`, error.message);
  }
};

/*---------------------------------------------------------------------------CREATE */

export const createDreamTeam = async (formData) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${BASE_ID}/${DREAMTEAM_TABLE_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                fldQNTnlx9adpYPLZ: new Date().toISOString(),
                fldruddpYqK2S9y9O: formData.primaryDriverId,
                flde0AntMy2fhXhLN: formData.secondaryDriverId,
                fldEZ5uA0PeyiaFRK: formData.constructorId,
                fldzCzTVwmK8aGquI: formData.circuitId,
              },
            },
          ],
          typecast: true,
        }),
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Airtable Error:`, errorData);
      return null;
    }
    const data = await response.json();
    return data.records[0];
  } catch (error) {
    console.error(`createDreamTeam error:`, error.message);
    return null;
  }
};
/*---------------------------------------------------------------------------EDIT */

export const editDreamTeam = async (recordId, formData) => {
  // console.log(`editDreamTeam:`, recordId, formData);
  try {
    const response = await fetch(
      `${BASE_URL}/${BASE_ID}/${DREAMTEAM_TABLE}/${recordId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            primaryDriverId: formData.primaryDriverId,
            secondaryDriverId: formData.secondaryDriverId,
            constructorId: formData.constructorId,
            circuitId: formData.circuitId,
          },
          typecast: true,
        }),
      },
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    // console.log(`editDreamTeam: updated`, data);
    return data;
  } catch (error) {
    console.error(`editDreamTeam error:`, error.message);
  }
};

/*---------------------------------------------------------------------------DELETE */

export const removeDreamTeam = async (recordId) => {
  // console.log(`removeDreamTeam: starting`, recordId);
  try {
    const response = await fetch(
      `${BASE_URL}/${BASE_ID}/${DREAMTEAM_TABLE}/${recordId}`,
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
    // console.log(`removeDreamTeam: deleted from Airtable`, data);
    return data.deleted;
  } catch (error) {
    console.error(`removeDreamTeam error:`, error.message);
    return false;
  }
};
