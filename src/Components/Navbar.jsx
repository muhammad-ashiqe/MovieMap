import React, { useState } from "react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="bg-gray-100 dark:bg-gray-800 shadow-md px-4 md:px-20 py-4 flex items-center justify-between">
      {/* Brand Name */}
      <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
        MovieMap
      </div>

      {/* Actions: Dark Mode Switch & Login */}
      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>

        {/* Login Button */}
        <button className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
