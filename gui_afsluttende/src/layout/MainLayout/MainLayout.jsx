import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
import { Outlet } from "react-router-dom";

export default function MainLayout({ }) {
  return (
    <div className="class_wrapper">
      <Header />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}