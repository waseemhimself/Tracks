import { useEffect, useState } from "react";

function Settings() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "auto"
  );

  useEffect(() => {
    if (theme === "auto") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.setAttribute(
        "data-theme",
        prefersDark ? "dark" : "light"
      );
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="card">
      <h1>Settings</h1>

      <label>Theme</label>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="auto">Auto (System)</option>
      </select>
    </div>
  );
}

export default Settings;
