import React from "react";
import MovieCard from "./MovieCard";
import { FiFilm } from "react-icons/fi";

const MovieList = ({ movieList }) => {
  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-gray-900  px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-emerald-100/30 dark:border-gray-700 p-8">
          {/* Header Section */}
          <div className="mb-10 text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-full shadow-md mb-4">
              <FiFilm className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-4xl font-extrabold text-emerald-900 dark:text-emerald-100 tracking-tight">
              Popular Movies
            </h2>
            <p className="text-lg text-emerald-600 dark:text-emerald-300 font-medium">
              Explore our curated collection of trending films
            </p>
          </div>

          {/* Movie Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movieList.length > 0 ? (
              movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="text-emerald-600/50 dark:text-emerald-400/50 text-6xl mb-6 animate-pulse">
                  <FiFilm className="inline-block" />
                </div>
                <p className="text-xl text-emerald-800 dark:text-emerald-200 font-semibold">
                  No movies found matching your criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
