import { useEffect, useState } from "react";
import GridContainer from "../components/GridContainer/GridContainer";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:8000/api/products/");
        const data = await res.json();
        const list = Array.isArray(data)
          ? data
          : data && data.results
          ? data.results
          : [];
        if (mounted) setProducts(list.slice(9, 12));
      } catch (e) {
        if (mounted) setError(e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchData();
    return function cleanup() {
      mounted = false;
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      <h2 style={{ margin: 0, textAlign: "center" }}>Udvalgte produkter</h2>
      <GridContainer products={products} style={{ position: "center" }} />
    </section>
  );
}
