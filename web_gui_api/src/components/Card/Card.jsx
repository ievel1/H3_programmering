import "./Card.css";

export default function Card({ title, imageSrc, price, description, button, onClick }) {
  return (
    <article className="card">
      <h3 className="card_title">{title}</h3>
      {imageSrc && (
        <img src={imageSrc} alt={title} className="card_image" />
      )}
      <p className="card_description">{description}</p>
      <p className="card_price">{price}</p>
      <button className="card_button" onClick={onClick}>{button}</button>
    </article>
  );
}