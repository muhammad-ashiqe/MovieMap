import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/Auth';
import { db } from '../config/firebase';
import MovieCard from '../Components/MovieCard';

const Wishlist = () => {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'wishlists', user.uid, 'movies'),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setMovies(snap.docs.map((d) => d.data()));
      },
      (err) => {
        console.error('Wishlist snapshot error:', err);
      }
    );

    return unsubscribe;
  }, [user]);

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-emerald-100/30 dark:border-gray-700">
          {/* Wishlist Title */}
          <div className="px-6 pt-6">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
              My Wishlist
            </h1>
          </div>

          {/* Wishlist Movies */}
          <div className="px-6 py-6">
            {movies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.map((m) => (
                  <MovieCard key={m.id} movie={m} />
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-300">No movies in your wishlist yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
