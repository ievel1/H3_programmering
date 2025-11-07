import "./GridContainer.css";
import { Link } from "react-router-dom";

export default function GridContainer({ products, children }) {
  if (products && products.length) {
    return (
      <div className="product-grid">
        {products.map((product) => (
          <article key={product.id} className="product-card">
            {product.image_url && (
              <img
                className="product-image"
                src={product.image_url}
                alt={product.title}
              />
            )}
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">Price: {product.price}</p>
            <p className="product-desc">{product.description}</p>
            <Link className="product-link" to={`/products/${product.id}`}>
              View Descriptions
            </Link>
          </article>
        ))}
      </div>
    );
  }

  return <div className="product-grid">{children}</div>;
}
