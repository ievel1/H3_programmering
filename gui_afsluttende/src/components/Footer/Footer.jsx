import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <section className="footer-col">
          <h4>CUSTOMER SERVICE</h4>
          <ul className="footer-list">
            <li>FAQ</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
            <li>Cookies</li>
            <li>Contact us</li>
          </ul>
        </section>
        <section className="footer-col">
          <h4>ABOUT SKATE SHOP</h4>
          <ul className="footer-list">
            <li>About the company</li>
            <li>Job & career</li>
            <li>Newsletter</li>
            <li>Stores</li>
            <li>Responsibility</li>
          </ul>
        </section>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Skate Shop. All rights reserved.</p>
      </div>
    </footer>
  );
}
