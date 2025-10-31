import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import GridContainer from "../components/GridContainer/GridContainer";

export default function Product_Page() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    if (category) {
      setCategoryId(category);
    }
    setCategoryId(category || "all");
  }, [location.search]);

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/products/");
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        if (mounted)
          setProducts(Array.isArray(data) ? data : data?.results ?? []);
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
    const query = search.trim().toLowerCase();
    const catId = categoryId === "all" ? null : Number(categoryId);

    let filtered = products;

    if (catId !== null) {
      filtered = filtered.filter(
        (p) => p && p.category && p.category.id === catId
      );
    }

    if (query) {
      filtered = filtered.filter((p) =>
        (p.title || "").toLowerCase().includes(query)
      );
    }
    return filtered;
  }, [products, search, categoryId]);

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
