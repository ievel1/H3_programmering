import { useState } from "react";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
// import InfoCard from "./components/InfoCard/InfoCard.jsx";
import "./App.css";
import Card from "./components/Card/Card.jsx";
import GridContainer from "./components/GridContainer/GridContainer.jsx";

function App() {
  const [count, setCount] = useState(0);

  const skateImages = import.meta.glob("./assets/skate*.{jpg,jpeg,png,webp}", {
  eager: true,
  as: "url",
  });

  const items = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  title: `Skateboard ${i + 1}`,
  imageSrc: skateImages[`./assets/skate${i + 1}.jpg`] || skateImages[`./assets/skate${i + 1}.jpeg`] || skateImages[`./assets/skate${i + 1}.png`] || skateImages[`./assets/skate${i + 1}.webp`] || null,
  price: `${1999 + i * 10},-`,
  description: "skateboard til alle aldre og niveauer",
  }));


  return (
    <>
      <div className="app-container">
        <Header name="William S. Ford" />
        <GridContainer>
          {items.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              imageSrc={item.imageSrc}
              price={item.price}
              description={item.description}
              button="Køb nu"
              onClick={() => setCount((c) => c + 1)}
            />
          ))}
        </GridContainer>
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
