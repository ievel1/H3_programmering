import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/description">Description</NavLink>
        <NavLink to="/product">Product Page</NavLink>
    </nav>
  )
}