import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import AnnouncementTicker from "./AnnouncementTicker";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getTotalItems, toggleCart } = useCart();
  const { toggleTheme, theme, togglePanel } = useTheme();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const count = getTotalItems();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-[60] transition-colors ${
        scrolled
          ? "border-b border-line bg-bg/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link to="/" className="font-display text-2xl tracking-tight">
          AETHER
        </Link>

        <div className="hidden items-center gap-8 text-sm tracking-widest uppercase md:flex">
          <a href="/#shop">Shop</a>
          {user?.isAdmin && <Link to="/admin">Atelier</Link>}
          {user ? (
            <>
              <span className="max-w-32 truncate normal-case tracking-normal text-muted">
                {user.name}
              </span>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Account</Link>
          )}
          <button type="button" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <button type="button" onClick={togglePanel} aria-label="Open theme settings">
            Theme
          </button>
          <button
            type="button"
            onClick={toggleCart}
            className="relative tracking-widest uppercase"
          >
            Bag
            {count > 0 && (
              <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] text-accent-ink">
                {count}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button type="button" onClick={toggleCart} className="text-sm tracking-widest uppercase">
            Bag {count > 0 ? `(${count})` : ""}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="text-sm tracking-widest uppercase"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-line bg-bg px-5 py-6 md:hidden">
          <div className="flex flex-col gap-4 text-sm tracking-widest uppercase">
            <a href="/#shop" onClick={() => setMenuOpen(false)}>
              Shop
            </a>
            {user?.isAdmin && (
              <Link to="/admin" onClick={() => setMenuOpen(false)}>
                Atelier
              </Link>
            )}
            {user ? (
              <button type="button" className="text-left" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Account
              </Link>
            )}
            <button type="button" className="text-left" onClick={toggleTheme}>
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
            <button
              type="button"
              className="text-left"
              onClick={() => {
                setMenuOpen(false);
                togglePanel();
              }}
            >
              Theme
            </button>
          </div>
        </div>
      )}
      <AnnouncementTicker />
    </nav>
  );
};

export default Navbar;
