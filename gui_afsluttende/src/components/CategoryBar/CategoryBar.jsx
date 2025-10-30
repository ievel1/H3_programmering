import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CategoryBar.css";

export default function CategoryBar() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { search, pathname } = useLocation();

  useEffect(() => {
    let mounted = true;
    async function fetchCats() {
      try {
        const res = await fetch("http://localhost:8000/api/categories/");
        if (!res.ok) return;
        const data = await res.json();
        if (mounted) setCategories(Array.isArray(data) ? data : (data && data.results ? data.results : []));
      } catch (e) {
      }
    }
    fetchCats();
    return () => { mounted = false; };
  }, []);

  const params = new URLSearchParams(search);
  const active = params.get("category") || "all";

  function goCategory(id) {
    if (id === "all") {
      navigate("/products");
    } else {
      navigate(`/products?category=${id}`);
    }
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="category-bar">
      <button
        className={"cat-btn" + (active === "all" ? " active" : "")}
        onClick={() => goCategory("all")}
      >
        Alle kategorier
      </button>

      {categories.map((c) => (
        <button
          key={c.id}
          className={"cat-btn" + (String(active) === String(c.id) ? " active" : "")}
          onClick={() => goCategory(c.id)}
        >
          {c.title}
        </button>
      ))}
    </div>
  );
}