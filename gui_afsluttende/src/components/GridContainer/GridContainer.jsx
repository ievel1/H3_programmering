import "./GridContainer.css";
import { Link } from "react-router-dom";

export default function GridContainer({ products, children }) {
  if (products && products.length) {
    return (
      <div className="product-grid">
        {products.map((item) => (
          <article key={item.id} className="product-card">
            {item.image_url && (
              <img className="product-image" src={item.image_url} alt={item.title} />
            )}
            <h3 className="product-title">{item.title}</h3>
            <p className="product-price">Price: {item.price}</p>
            <p className="product-desc">{item.description}</p>
            <Link className="product-link" to={`/products/${item.id}`}>View Descriptions</Link>
          </article>
        ))}
      </div>
    );
  }

  return <div className="product-grid">{children}</div>;
}