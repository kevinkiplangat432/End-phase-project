import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
// Create Theme Context
const ThemeContext = createContext();
// ThemeProvider component to wrap around the app
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));
// Provide theme context value
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);