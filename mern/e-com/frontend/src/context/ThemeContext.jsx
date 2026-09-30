import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const ACCENTS = ["ember", "sage", "violet"];

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

const getStored = (key, fallback) => {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => getStored("aether-theme", "light"));
  const [accent, setAccent] = useState(() => getStored("aether-accent", "ember"));
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.setAttribute("data-accent", accent);
    localStorage.setItem("aether-theme", theme);
    localStorage.setItem("aether-accent", accent);
  }, [theme, accent]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = {
    theme,
    accent,
    accents: ACCENTS,
    setTheme,
    setAccent,
    toggleTheme,
    panelOpen,
    openPanel: () => setPanelOpen(true),
    closePanel: () => setPanelOpen(false),
    togglePanel: () => setPanelOpen((open) => !open),
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
