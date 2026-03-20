import { NavLink } from "react-router-dom";

const NavBar = () => {
  console.log("NavBar");
  return (
    <nav>
      <NavLink to="/">Overview</NavLink>
      <NavLink to="/drivers">Drivers</NavLink>
      <NavLink to="/dream-team">Dream Team</NavLink>
      <NavLink to="/races">Races</NavLink>
    </nav>
  );
};

export default NavBar;
