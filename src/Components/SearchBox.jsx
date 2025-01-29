import React, { useEffect, useState } from "react";

const SearchBar = ({ setSearchQuery, searchQuery }) => {
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    console.log(searchQuery);
  }, [searchQuery]);

  return (
    <div className="bg-inherit py-4 shadow-md w-full mb-5">
      <div className="container mx-auto px-10 md:px-100 flex items-center space-x-2">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search for movies..."
          className="flex-grow p-3 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        />
      </div>
    </div>
  );
};

export default SearchBar;
