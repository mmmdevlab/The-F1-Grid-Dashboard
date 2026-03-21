import { NavLink } from "react-router-dom";
import f1Logo from "../assets/f1-assets/F1-Logo.svg";

const NavBar = () => {
  // console.log("NavBar");
  return (
    <nav className="flex item-center justify-between px-8 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-2">
        <img src={f1Logo} alt="F1 Logo" className="h-6" />
        <span className="font-bold text-lg">Welcome to The Grid</span>
      </div>
      <div className="flex gap-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-red-600 font-semibold"
              : "text-gray-600 hover:text-black"
          }
        >
          Overview
        </NavLink>
        <NavLink
          to="/drivers"
          className={({ isActive }) =>
            isActive
              ? "text-red-600 font-semibold"
              : "text-gray-600 hover:text-black"
          }
        >
          Drivers
        </NavLink>
        <NavLink
          to="/dream-team"
          className={({ isActive }) =>
            isActive
              ? "text-red-600 font-semibold"
              : "text-gray-600 hover:text-black"
          }
        >
          Dream Team
        </NavLink>
        <NavLink
          to="/races"
          className={({ isActive }) =>
            isActive
              ? "text-red-600 font-semibold"
              : "text-gray-600 hover:text-black"
          }
        >
          Races
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
