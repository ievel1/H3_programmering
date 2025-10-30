import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


export default function ProductDetail() {
  const [loading, setLoading] = useState(true);
  const [products, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8000/api/products/${id}/`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
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
  if (!products) return <p>Produkt ikke fundet</p>;

    return (
      <main style={{ padding: 16, maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <h1>{products.title}</h1>
        {products.image_url && (
            <img
              className="product-image"
              src={products.image_url}
              alt={products.title}
              style={{ width: "100%", maxWidth: 420, borderRadius: 8, margin: "12px 0" }}
            />
        )}
            <p style={{ fontWeight: 700 }}className="product-price" >Price: {products.price}</p>
            <p style={{ marginTop: 8 }}className="product-desc">{products.description}</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <button onClick={() => navigate("/products")}>Go Back</button>
        </div>
      </main>
  );
}