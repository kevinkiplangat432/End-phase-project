// src/components/SearchBar.jsx
import React from "react";

function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search by title or author..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full md:w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
    />
  );
}

export default SearchBar;
