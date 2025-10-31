import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header_class">
      <div className="container header_inner">
        <h1>
          <Link to="/" className="header_link">
            Skate Shop
          </Link>
        </h1>
      </div>
    </header>
  );
}
