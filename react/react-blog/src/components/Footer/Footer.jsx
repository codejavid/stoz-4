import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="footer__brand">Apex Lane</p>
          <p className="footer__copy">
            Independent notes on machines, roads, and the people who love them.
          </p>
        </div>
        <nav className="footer__nav" aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
      <p className="footer__legal">© {new Date().getFullYear()} Apex Lane. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
