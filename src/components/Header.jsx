// src/components/Header.jsx
import React from "react";
import DarkModeToggle from "./DarkModeToggle";
import { NavLink } from "react-router-dom";

function Header() {
  const linkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 
     ${isActive
       ? "bg-blue-600 text-white dark:bg-blue-500"
       : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
     }`;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo / App name */}
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Readify
        </h1>

        {/* Navigation links */}
        <nav className="flex space-x-4">
          <NavLink to="/" className={linkClasses}>
            Home
          </NavLink>
          <NavLink to="/library" className={linkClasses}>
            Library
          </NavLink>
          <DarkModeToggle/>
        </nav>
      </div>
    </header>
  );
}

export default Header;
