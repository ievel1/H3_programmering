export default  function Header({ name }) {
  return (
    <header>
      <h2 className="name">Navn: {name}</h2>
    </header>
  );
}