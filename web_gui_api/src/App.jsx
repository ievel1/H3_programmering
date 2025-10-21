import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import skatePhoto from "./assets/skate.jpg";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import InfoCard from "./components/InfoCard/InfoCard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <InfoCard />
      <Footer />
      <div>
        <a href="https://www.youtube.com/watch?v=l54Otifga5o&list=RDl54Otifga5o&start_radio=1" target="_blank">
          <img src={skatePhoto} style={{ width: 420 }} className="logo" alt="Skate" />
        </a>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
