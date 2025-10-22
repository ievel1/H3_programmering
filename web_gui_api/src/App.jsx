import { useState } from "react";
import skatePhoto from "./assets/skate.jpg";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import InfoCard from "./components/InfoCard/InfoCard.jsx";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <div className="app-container">
      <Header name="William S. Ford" />
      <InfoCard
        hobbyOne="Skateboarding"
        hobbyTwo="Playing Guitar/Piano"
        hobbyThree="Programming"
        imageSrc={skatePhoto}
        link="https://www.youtube.com/watch?v=l54Otifga5o&list=RDl54Otifga5o&start_radio=1"
      />
      <Footer age={26} />
    </div>
      <div className="card app-container">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
