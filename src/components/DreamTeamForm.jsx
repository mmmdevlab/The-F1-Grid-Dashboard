const DreamTeamForm = ({
  formData,
  handleChange,
  handleSubmit,
  handleCancelEdit,
  isEditing,
  drivers,
  constructors,
  races,
}) => {
  return (
    <section className="bg-white rounded-2xl p-6 flex flex-col gap-5 border border-gray-200">
      <h2 className="text-xs font-bold tracking-widest text-red-600 uppercase">
        Pick Your Dream Team
      </h2>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold tracking-widest uppercase text-gray-500">
          Primary Driver
        </label>
        <select
          type="select"
          className="w-full p-3 border rounded-xl border-gray-200 text-md"
          name="primaryDriverId"
          value={formData.primaryDriverId}
          onChange={handleChange}
        >
          <option value="">Select Driver</option>
          {drivers.map((d) => (
            <option key={d.driverId} value={d.driverId}>
              {d.givenName} {d.familyName}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold tracking-widest uppercase text-gray-500">
          Secondary Driver
        </label>
        <select
          type="select"
          className="w-full p-3 border rounded-xl border-gray-200 text-md"
          name="secondaryDriverId"
          value={formData.secondaryDriverId}
          onChange={handleChange}
        >
          <option value="">Select Driver</option>
          {drivers.map((d) => (
            <option key={d.driverId} value={d.driverId}>
              {d.givenName} {d.familyName}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold tracking-widest uppercase text-gray-500">
          Favourite Team
        </label>
        <select
          type="select"
          className="w-full p-3 border rounded-xl border-gray-200 text-md"
          name="constructorId"
          value={formData.constructorId}
          onChange={handleChange}
        >
          <option value="">Select Team</option>
          {constructors?.map((c) => (
            <option key={c.constructorId} value={c.constructorId}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold tracking-widest uppercase text-gray-500">
          Favourite Track
        </label>
        <select
          type="select"
          className="w-full p-3 border rounded-xl border-gray-200 text-md"
          name="circuitId"
          value={formData.circuitId}
          onChange={handleChange}
        >
          <option value="">Select Race Track</option>
          {races?.map((r) => (
            <option key={r.Circuit.circuitId} value={r.Circuit.circuitId}>
              {r.raceName} — {r.Circuit.Location.country}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition"
        >
          {isEditing ? "Update Team" : "Save Your Team"}
        </button>
        {isEditing && (
          <button
            onClick={handleCancelEdit}
            className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-200 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </section>
  );
};

export default DreamTeamForm;
