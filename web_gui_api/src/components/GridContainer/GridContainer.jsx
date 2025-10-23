import "./GridContainer.css";

export default function GridContainer({ products, children }) {
  if (products && products.length) {
    return (
      <div className="product-grid">
        {products.map((item) => (
          <article key={item.id} className="product-card">
            <img
              className="product-image"
              src={item.images?.[0]}
              alt={item.title}
            />
            <h3 className="product-title">{item.title}</h3>
            <p className="product-price">Price: {item.price}</p>
            <p className="product-desc">{item.description}</p>
          </article>
        ))}
      </div>
    );
  }

  return <div className="product-grid">{children}</div>;
}