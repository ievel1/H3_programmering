import { useState, useEffect } from "react";
import "./Counter.css";
const defaultTitle = document.title;

export default function Counter() {
  const [count, setCount] = useState(0);

    useEffect(() => {
    if (count > 10) {
      alert("Du har købt over 10 skateboards!")
      document.title = `${defaultTitle} (${count})`;
    }
    }, [count]);

  return (
    <div className="counter">
        <p>count is {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Klik</button>
      <button className="secondary" onClick={() => setCount(0)}>Nulstil</button>
    </div>
  );
}
