import { useState } from "react";
import "./Carousel.css";

export default function Carousel({ images = [], altPrefix = "Slide", width = 800, height = 450 }) {
  const [index, setIndex] = useState(0);
  const pics = images.filter(Boolean);
  if (!pics.length) return null;

  const prev = () => setIndex((i) => (i - 1 + pics.length) % pics.length);
  const next = () => setIndex((i) => (i + 1) % pics.length);

  return (
    <div className="carousel" style={{ width, height }}>
      <button className="carousel__arrow left" onClick={prev} aria-label="Previous">&#10094;</button>
      <img className="carousel__image" src={pics[index]} alt={`${altPrefix} ${index + 1}`} />
      <button className="carousel__arrow right" onClick={next} aria-label="Next">&#10095;</button>

      <div className="carousel__dots">
        {pics.map((_, i) => (
          <button
            key={i}
            className={`carousel__dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}