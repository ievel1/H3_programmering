import { useState } from "react";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
// import InfoCard from "./components/InfoCard/InfoCard.jsx";
import "./App.css";
import Card from "./components/Card/Card.jsx";
import GridContainer from "./components/GridContainer/GridContainer.jsx";
import Counter from "./components/Counter/Counter.jsx";
const thrasherImages = import.meta.glob("./assets/thrasher*.{jpg,jpeg,png,webp}", { eager: true, as: "url" });
import Carousel from "./components/Carousel/Carousel.jsx";
const thrasherUrls = Object.entries(thrasherImages)
  .sort((a, b) => {
    const na = (a[0].match(/thrasher(\d+)/i) || [])[1] ?? "0";
    const nb = (b[0].match(/thrasher(\d+)/i) || [])[1] ?? "0";
    return Number(na) - Number(nb);
  })
  .slice(0, 3)
  .map(([, url]) => url);

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
      <Header name="William S. Ford" />
      <div className="app-container">
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
      </div>
      
      <div className="card app-container">
        <Carousel images={thrasherUrls} width={800} height={450} />
        <Counter count={count} />
      </div>
        <Footer age={26} />
    </>
  );
}

export default App;
