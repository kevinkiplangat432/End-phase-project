import { useState, useEffect } from "react";
// Custom hook to manage localStorage state
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (e) {
      console.error("useLocalStorage parse error", e);
      return initialValue;
    }
  });
// Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("useLocalStorage stringify error", e);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;