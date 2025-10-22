import React from "react";
import { useTheme } from "./ThemeContext";

function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1M4.2 4.2l.7.7M19.1 19.1l.7.7M1 12h1m20 0h1M4.2 19.8l.7-.7M19.1 4.9l.7-.7M12 7a5 5 0 100 10 5 5 0 000-10z"/>
          </svg>
          <span className="text-sm">Light</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
          <span className="text-sm">Dark</span>
        </>
      )}
    </button>
  );
}

export default DarkModeToggle;
