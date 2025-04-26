import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FiStar, FiClock, FiArrowLeft, FiGlobe, FiDollarSign, FiFilm } from "react-icons/fi";
import { MdLocalMovies, MdLanguage, MdOutlinePublic } from "react-icons/md";

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
    return (
      <div className="min-h-screen bg-emerald-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-emerald-600 dark:text-emerald-400 text-lg font-medium animate-pulse">
          Loading Movie Magic...
        </div>
      </div>
    );
  }

  // Helper function to format currency
  const formatCurrency = (amount) => {
    return amount ? `$${amount.toLocaleString()}` : 'N/A';
  };

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-emerald-100/30 dark:border-gray-700">
          {/* Back Button */}
          <div className="px-6 pt-6">
            <Link
              to="/"
              className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors group"
            >
              <FiArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Movies
            </Link>
          </div>

          {/* Content Container */}
          <div className="flex flex-col lg:flex-row gap-8 p-6 md:p-8">
            {/* Poster Section */}
            <div className="lg:w-1/3 relative group">
              <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-lg border-4 border-emerald-100/20 dark:border-gray-700">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
                    <MdLocalMovies className="w-20 h-20 text-emerald-400/50 dark:text-emerald-600/50" />
                  </div>
                )}
              </div>
            </div>

            {/* Details Section */}
            <div className="lg:w-2/3 space-y-6">
              {/* Title Section */}
              <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  {movie.title}
                  <span className="text-emerald-600 dark:text-emerald-400 ml-3 text-2xl md:text-3xl">
                    ({new Date(movie.release_date).getFullYear()})
                  </span>
                </h1>
                {movie.tagline && (
                  <p className="text-lg italic text-emerald-700/80 dark:text-emerald-300/80">
                    "{movie.tagline}"
                  </p>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="flex items-center bg-emerald-100/50 dark:bg-emerald-900/30 px-4 py-2 rounded-xl">
                  <FiStar className="text-emerald-600 dark:text-emerald-400 mr-2 flex-shrink-0" />
                  <span className="text-emerald-800 dark:text-emerald-300 font-medium truncate">
                    {movie.vote_average?.toFixed(1)}/10
                  </span>
                </div>
                <div className="flex items-center bg-emerald-100/50 dark:bg-emerald-900/30 px-4 py-2 rounded-xl">
                  <FiClock className="text-emerald-600 dark:text-emerald-400 mr-2 flex-shrink-0" />
                  <span className="text-emerald-800 dark:text-emerald-300 font-medium">
                    {movie.runtime} mins
                  </span>
                </div>
                <div className="flex items-center bg-emerald-100/50 dark:bg-emerald-900/30 px-4 py-2 rounded-xl">
                  <FiDollarSign className="text-emerald-600 dark:text-emerald-400 mr-2 flex-shrink-0" />
                  <span className="text-emerald-800 dark:text-emerald-300 font-medium truncate">
                    {formatCurrency(movie.budget)}
                  </span>
                </div>
              </div>

              {/* Overview Section */}
              <div className="prose prose-emerald dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3 flex items-center">
                  <FiFilm className="mr-2" />
                  Storyline
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {movie.overview || "No overview available."}
                </p>
              </div>

              {/* Detailed Info Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Genres & Languages */}
                <div className="bg-emerald-50/50 dark:bg-gray-700/30 p-4 rounded-xl">
                  <h4 className="text-emerald-600 dark:text-emerald-400 font-semibold mb-3 flex items-center">
                    <MdLanguage className="mr-2" />
                    Details
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="w-24 text-emerald-700 dark:text-emerald-300">Genres:</span>
                      <div className="flex flex-wrap gap-2">
                        {movie.genres.map(genre => (
                          <span key={genre.id} className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-xs">
                            {genre.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-24 text-emerald-700 dark:text-emerald-300">Languages:</span>
                      <div className="flex flex-wrap gap-2">
                        {movie.spoken_languages.map(lang => (
                          <span key={lang.iso_639_1} className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-xs">
                            {lang.english_name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Production & Countries */}
                <div className="bg-emerald-50/50 dark:bg-gray-700/30 p-4 rounded-xl">
                  <h4 className="text-emerald-600 dark:text-emerald-400 font-semibold mb-3 flex items-center">
                    <MdOutlinePublic className="mr-2" />
                    Production
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="w-24 text-emerald-700 dark:text-emerald-300">Companies:</span>
                      <div className="flex flex-wrap gap-2">
                        {movie.production_companies.map(company => (
                          <span key={company.id} className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-xs">
                            {company.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-24 text-emerald-700 dark:text-emerald-300">Countries:</span>
                      <div className="flex flex-wrap gap-2">
                        {movie.production_countries.map(country => (
                          <span key={country.iso_3166_1} className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-xs">
                            {country.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
