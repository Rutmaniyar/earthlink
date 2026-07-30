import { createContext, useContext, useEffect, type ReactNode } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (t: Theme) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "theme";

function applyLightTheme() {
  const root = document.documentElement;
  root.classList.remove("dark");
  root.style.colorScheme = "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, "light");
    applyLightTheme();
  }, []);

  const setTheme = (t: Theme) => {
    localStorage.setItem(STORAGE_KEY, "light");
    applyLightTheme();
  };

  const toggle = () => setTheme("light");

  return (
    <ThemeContext.Provider value={{ theme: "light", resolvedTheme: "light", setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}

/**
 * Inline script injected into <head> to set the theme class before hydration.
 * Prevents flash of wrong theme.
 */
export const themeInitScript = `(function(){try{localStorage.setItem('theme','light');var e=document.documentElement;e.classList.remove('dark');e.style.colorScheme='light';}catch(e){}})();`;
