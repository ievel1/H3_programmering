import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/Products">Product Page</NavLink>
    </nav>
  )
}