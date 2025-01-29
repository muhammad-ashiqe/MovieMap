import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
          }
        );
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-700 dark:text-white text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-10 min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="max-w-5xl bg-gray-800/60 backdrop-blur-md p-8 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/3">
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://ih1.redbubble.net/image.1579932061.4264/fposter,medium,wall_texture,product,750x1000.webp"}
            alt={movie.title}
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>

        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-extrabold text-indigo-400">{movie.title}</h1>
          <p className="text-gray-300 mt-4 text-lg">{movie.overview || "No overview available."}</p>

          <div className="mt-6 space-y-3">
            <p className="text-gray-400 text-lg"><strong className="text-indigo-300">Release Date:</strong> {movie.release_date || "N/A"}</p>
            <p className="text-gray-400 text-lg"><strong className="text-indigo-300">Runtime:</strong> {movie.runtime || "N/A"} minutes</p>
            <p className="text-gray-400 text-lg"><strong className="text-indigo-300">Genres:</strong> {movie.genres.map((genre) => genre.name).join(", ") || "N/A"}</p>
            <p className="text-gray-400 text-lg"><strong className="text-indigo-300">Rating:</strong> ⭐ {movie.vote_average || "N/A"}</p>
          </div>

          <Link
            to="/"
            className="mt-6 inline-block px-6 py-3 bg-indigo-500 text-white text-lg font-medium rounded-lg hover:bg-indigo-600 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
