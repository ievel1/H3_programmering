import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Navigation from "../../components/Navigation/Navigation.jsx";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="page-wrapper">
      <Header name="William S. Ford" />
      <Navigation />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer age={26} />
    </div>
  );
}