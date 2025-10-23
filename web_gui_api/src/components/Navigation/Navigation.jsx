import { NavLink } from "react-router-dom";
import "./Navigation.css";

export default function Navigation() {
  return (
    <nav className="nav">
      <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
        Home
      </NavLink>
      <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
        About
      </NavLink>
      <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
        Contact
      </NavLink>
    </nav>
  );
}