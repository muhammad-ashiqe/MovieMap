import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/Auth';
import { doc, getDoc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { FiHeart, FiStar } from 'react-icons/fi';
import { MdLocalMovies } from 'react-icons/md';

const MovieCard = ({ movie }) => {
  const { user } = useAuth();
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!user) return;
    (async () => {
      try {
        const ref = doc(db, 'wishlists', user.uid, 'movies', String(movie.id));
        const snap = await getDoc(ref);
        if (!cancelled) setWishlisted(snap.exists());
      } catch (err) {
        console.error('Error checking wishlist status:', err);
      }
    })();
    return () => { cancelled = true; };
  }, [user, movie.id]);

  const handleWishlist = async (e) => {
    e.preventDefault();
    if (!user) return;
    const ref = doc(db, 'wishlists', user.uid, 'movies', String(movie.id));
    try {
      if (wishlisted) {
        await deleteDoc(ref);
        setWishlisted(false);
      } else {
        await setDoc(ref, {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          timestamp: serverTimestamp(),
        });
        setWishlisted(true);
      }
    } catch (err) {
      console.error('Failed to update wishlist:', err);
    }
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] bg-white dark:bg-gray-800 hover:-translate-y-1">
      <div className="relative aspect-[2/3]">
        <Link to={`/movie/${movie.id}`} className="block h-full">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-emerald-900/20 flex items-center justify-center">
              <MdLocalMovies className="w-16 h-16 text-emerald-500/50" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-emerald-800/30 to-transparent" />
        </Link>

        {/* Wishlist Button */}
        {user && (
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 shadow-sm ${
              wishlisted 
                ? 'bg-emerald-600/90 text-white hover:bg-emerald-700'
                : 'bg-white/90 text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 dark:bg-gray-700/90 dark:hover:bg-emerald-800/80'
            }`}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <FiHeart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
          </button>
        )}

        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-600/90 backdrop-blur-sm text-white text-sm font-medium">
          <FiStar className="w-4 h-4" />
          <span>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-emerald-100/50 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate mb-1">
          {movie.title}
        </h3>
        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
        </p>
        
       
      </div>
    </div>
  );
};


export default MovieCard;