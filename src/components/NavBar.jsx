import { useState } from "react";
import { NavLink } from "react-router-dom";
import f1Logo from "../assets/f1-assets/F1-Logo.svg";

const navLinks = [
  { to: "/", label: "Overview" },
  { to: "/drivers", label: "Drivers" },
  { to: "/dream-team", label: "Dream Team" },
  { to: "/races", label: "Races" },
];

const linkClass = ({ isActive }) =>
  isActive ? "text-red-600 font-semibold" : "text-gray-600 hover:text-black";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-2">
          <img src={f1Logo} alt="F1 Logo" className="h-6" />
          <span className="font-bold text-lg">Welcome to The Grid</span>
        </div>

        <div className="hidden md:flex gap-8">
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} className={linkClass}>
              {label}
            </NavLink>
          ))}
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 bg-gray-800" />
          <span className="block w-5 h-0.5 bg-gray-800" />
          <span className="block w-5 h-0.5 bg-gray-800" />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col px-8 pb-4 gap-4 border-t border-gray-100">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
