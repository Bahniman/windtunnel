import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";
function currentTheme(): Theme {
  if (typeof document !== "undefined" && document.documentElement.dataset.theme === "dark") return "dark";
  return "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(currentTheme);
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    try { window.localStorage.setItem("theme", theme); } catch { /* storage can be unavailable */ }
  }, [theme]);

  return <button type="button" className="suite-theme" aria-pressed={theme === "dark"}
    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
    {theme === "dark" ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
  </button>;
}
