import React, { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import { NavLink } from "react-router-dom";

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 
     ${isActive
       ? "bg-blue-600 text-white dark:bg-blue-500"
       : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
     }`;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Readify</h1>
          <p className="hidden sm:block text-sm text-gray-600 dark:text-gray-300">Discover free books</p>
        </div>

        <nav className="hidden md:flex items-center gap-3">
          <NavLink to="/" className={linkClasses}>Home</NavLink>
          <NavLink to="/library" className={linkClasses}>Library</NavLink>
          <DarkModeToggle />
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <DarkModeToggle />
          <button
            onClick={() => setMobileOpen((s) => !s)}
            aria-label="Toggle menu"
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-2">
            <NavLink to="/" className={linkClasses} onClick={() => setMobileOpen(false)}>Home</NavLink>
            <NavLink to="/library" className={linkClasses} onClick={() => setMobileOpen(false)}>Library</NavLink>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
