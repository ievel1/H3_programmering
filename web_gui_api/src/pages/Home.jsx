import { useEffect, useState, useMemo } from "react";
import GridContainer from "../components/GridContainer/GridContainer";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        if (mounted) setProducts(data.products || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  const view = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => (p.title || "").toLowerCase().includes(q));
  }, [products, search]);



  if (loading) return <div>Loading...</div>;
  if (error) return <p>Error: {error}</p>;

  return (
        <div style={{ maxWidth: 1100, margin: "12px auto", padding: "0 16px" }}>
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Søg produkter..."
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 10,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.02)",
          color: "inherit",
          boxSizing: "border-box",
          marginBottom: 12,
        }}
      />
      <GridContainer products={view} />
    </div>
  );
}
