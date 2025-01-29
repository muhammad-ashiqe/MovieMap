import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import MovieList from "../Components/MovieList";
import SearchBar from "../Components/SearchBox";
import { debounce } from "lodash"; // Import debounce from lodash

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/";

const Home = () => {
  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Function to fetch movies from API
  const fetchMovies = async (query, page) => {
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
    }
  };

  // Debounced API call to avoid frequent requests while typing
  const debouncedFetchMovies = useCallback(debounce(fetchMovies, 1000), []);

  // Fetch movies when search query changes (with debounce)
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
    <>
      <SearchBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
      <div className="bg-[#000c24] text-white min-h-screen mb-20">
        {errorMessage && <p className="text-red-500 text-center text-lg">{errorMessage}</p>}
        <MovieList movieList={movieList} />

        {/* Pagination Controls */}
        <div className="flex justify-center gap-4 my-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-6 py-3 bg-indigo-500 text-white rounded-lg disabled:opacity-50 hover:bg-indigo-600 transition-all duration-300"
          >
            Previous
          </button>
          <span className="text-xs font-bold text-gray-400 text-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="px-6 py-3 bg-indigo-500 text-white rounded-lg disabled:opacity-50 hover:bg-indigo-600 transition-all duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
