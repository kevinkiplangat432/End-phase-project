// src/components/Filter.jsx
import React from "react";

function Filter({ language, onLanguageChange, sortOption, onSortChange }) {
  return (
    <div className="flex gap-4">
      {/* Language Filter */}
      <select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All Languages</option>
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="es">Spanish</option>
        <option value="de">German</option>
        <option value="it">Italian</option>
      </select>

      {/* Sort Option */}
      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
      >
        <option value="default">Default</option>
        <option value="downloads">Most Downloaded</option>
        <option value="title">Title (A–Z)</option>
      </select>
    </div>
  );
}

export default Filter;
