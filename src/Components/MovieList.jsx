import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movieList }) => {
  return (
    <div className="container mx-auto px-5 md:px-20 py-8 bg-[#000c24]">
      
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
       Popular Movies
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movieList.length > 0 ? (
          movieList.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center col-span-full">
            No movies found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieList;
