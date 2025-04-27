import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import MovieList from "../Components/MovieList";
import SearchBar from "../Components/SearchBox";
import { debounce } from "lodash";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"; // Adding nice icons for buttons

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/";

const Home = () => {
  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  // Function to fetch movies from API
  const fetchMovies = async (query, page) => {
    setIsLoading(true); // Start loading
    try {
      const endpoint = query ? "search/movie" : "trending/movie/day";
      const params = query
        ? { query, include_adult: false, language: "en-US", page }
        : { language: "en-US", page };

      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        params,
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          accept: "application/json",
        },
      });

      if (response.status === 200) {
        setMovieList(response.data.results);
        setTotalPages(response.data.total_pages);
        setErrorMessage("");
      } else {
        setErrorMessage(`Error: ${response.statusText}`);
      }
    } catch (error) {
      setErrorMessage(`Failed to fetch movies: ${error.message}`);
      console.error("Fetch error:", error.response?.data || error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Debounced API call to avoid frequent requests while typing
  const debouncedFetchMovies = useCallback(debounce(fetchMovies, 1000), []);

  // Fetch movies when search query or page changes
  useEffect(() => {
    if (searchQuery.trim()) {
      debouncedFetchMovies(searchQuery, currentPage);
    } else {
      fetchMovies("", currentPage);
    }
  }, [searchQuery, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-emerald-50 dark:bg-gray-900 min-h-screen">
      {/* Search Bar */}
      <SearchBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />

      {/* Error Message */}
      {errorMessage && (
        <p className="text-red-500 text-center text-lg py-4">{errorMessage}</p>
      )}

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <MovieList movieList={movieList} />
      )}

      {/* Pagination Controls */}
      {!isLoading && movieList.length > 0 && (
        <div className="flex justify-center items-center gap-6 my-8">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-5 py-3 rounded-full 
               bg-white/20 dark:bg-emerald-800/20 backdrop-blur-lg 
               text-emerald-800 dark:text-emerald-200 
               font-semibold disabled:opacity-50 disabled:cursor-not-allowed 
               hover:bg-white/30 dark:hover:bg-emerald-800/30 
               transition-all duration-300 shadow-md"
          >
            <FiArrowLeft /> Previous
          </button>

          <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="flex items-center gap-2 px-5 py-3 rounded-full 
               bg-white/20 dark:bg-emerald-800/20 backdrop-blur-lg 
               text-emerald-800 dark:text-emerald-200 
               font-semibold disabled:opacity-50 disabled:cursor-not-allowed 
               hover:bg-white/30 dark:hover:bg-emerald-800/30 
               transition-all duration-300 shadow-md"
          >
            Next <FiArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
