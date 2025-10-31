import "./SingleProduct.css";
import { useNavigate } from "react-router-dom";

export default function SingleProduct({ product }) {
  const navigate = useNavigate();

  return (
    <main className="product-detail">
      <div className="container">
        <div className="detail-grid">
          <div className="detail-image-wrap">
            {product.image_url && (
              <img
                className="detail-image"
                src={product.image_url}
                alt={product.title}
              />
            )}
          </div>
          <div className="detail-info">
            <h1 className="detail-title">{product.title}</h1>
            <div className="detail-price-row">
              <span className="detail-price">kr. {product.price}</span>
            </div>
            <div className="detail-actions">
              <button type="button" className="detail-button primary">
                Add to cart
              </button>
              <button
                type="button"
                className="detail-button"
                onClick={() => navigate("/products")}
              >
                Go back
              </button>
            </div>
            <h3 className="detail-subtitle">Product Description</h3>
            <p className="detail-desc">{product.description}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
