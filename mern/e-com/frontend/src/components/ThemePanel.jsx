import { useTheme } from "../context/ThemeContext";

const accentLabels = {
  ember: "Ember",
  sage: "Sage",
  violet: "Violet",
};

const ThemePanel = () => {
  const {
    theme,
    accent,
    accents,
    setAccent,
    toggleTheme,
    panelOpen,
    togglePanel,
    closePanel,
  } = useTheme();

  return (
    <>
      <button
        type="button"
        onClick={togglePanel}
        aria-label="Theme settings"
        className="fixed bottom-6 left-6 z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-lg transition hover:border-accent"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      </button>

      {panelOpen && (
        <div className="fixed inset-0 z-[70]">
          <button
            type="button"
            className="absolute inset-0 bg-ink/30"
            aria-label="Close theme settings"
            onClick={closePanel}
          />
          <aside className="absolute bottom-24 left-6 w-[min(90vw,20rem)] rounded-2xl border border-line bg-surface/95 p-5 shadow-2xl backdrop-blur-md">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display text-sm tracking-widest uppercase">
                Atmosphere
              </p>
              <button
                type="button"
                onClick={closePanel}
                className="text-muted hover:text-ink"
              >
                Close
              </button>
            </div>

            <div className="mb-5">
              <p className="mb-2 text-xs tracking-widest text-muted uppercase">
                Mode
              </p>
              <button
                type="button"
                onClick={toggleTheme}
                className="flex w-full items-center justify-between rounded-full border border-line px-4 py-2 text-sm"
              >
                <span>{theme === "dark" ? "Dark" : "Light"}</span>
                <span className="h-2 w-2 rounded-full bg-accent" />
              </button>
            </div>

            <div>
              <p className="mb-2 text-xs tracking-widest text-muted uppercase">
                Accent
              </p>
              <div className="flex gap-2">
                {accents.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setAccent(name)}
                    className={`flex-1 rounded-full border px-2 py-2 text-xs tracking-wide uppercase ${
                      accent === name
                        ? "border-accent text-ink"
                        : "border-line text-muted"
                    }`}
                  >
                    {accentLabels[name]}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default ThemePanel;
