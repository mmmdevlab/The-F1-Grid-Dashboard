import { useEffect } from "react";
import { getDrivers } from "../services/jolpi";

const OverviewPage = () => {
  useEffect(() => {
    getDrivers();
  }, []);

  return (
    <main className="px-8 py-6">
      <h1 className="text-2xl font-bold mb-6">Overview Page</h1>
      <section>Next Race</section>
      <section>Driver Standings</section>
      <section>Favourite Driver</section>
    </main>
  );
};

export default OverviewPage;
