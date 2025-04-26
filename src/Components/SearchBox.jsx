import React from "react";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="bg-emerald-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Search Icon */}
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500 dark:text-emerald-400" size={20} />

          {/* Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleChange}
            placeholder="Search for movies..."
            className="w-full pl-12 pr-12 py-3 rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300"
          />

          {/* Clear Button */}
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400 transition-colors"
            >
              <FiX size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
