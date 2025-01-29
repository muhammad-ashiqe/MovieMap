import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://ih1.redbubble.net/image.1579932061.4264/fposter,medium,wall_texture,product,750x1000.webp";
  
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
    : posterUrl; // Fallback to poster if backdrop is unavailable

  return (
    <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg transform hover:scale-105 transition duration-300">
      {/* Backdrop Image Section */}
      <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64">
        <img
          src={backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      </div>

      {/* Movie Details */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
          {movie.title}
        </h3>

        {/* Release Date */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Release Date: {movie.release_date || "N/A"}
        </p>

        {/* Rating */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </span>

          {/* Details Button */}
          <Link
            to={`/movie/${movie.id}`}
            className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition duration-300"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
