import "./Header.css";

export default  function Header({ name }) {
  return (
    <header className="header_class">
      <h2 className="name">Navn: {name}</h2>
    </header>
  );
}