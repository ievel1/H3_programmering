import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleProduct from "../components/SingleProduct/SingleProduct";

export default function ProductDetail() {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:8000/api/products/${id}/`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        if (mounted) setProduct(data);
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
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Produkt ikke fundet</p>;

  return <SingleProduct product={product} />;
}
