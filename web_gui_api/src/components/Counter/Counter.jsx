import { useState } from "react";
import "./Counter.css";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div className="counter">
        <p>count is {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Klik</button>
      <button className="secondary" onClick={() => setCount(0)}>Nulstil</button>
    </div>
  );
}
