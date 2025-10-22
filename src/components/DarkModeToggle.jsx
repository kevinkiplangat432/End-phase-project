// src/components/DarkModeToggle.jsx
import React from "react";
import { useTheme } from "./ThemeContext";

function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      aria-label="Toggle Dark Mode"
    >
      {theme === "light" ? "Light" : " Dark"}
    </button>
  );
}

export default DarkModeToggle;
