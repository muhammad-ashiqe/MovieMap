import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { FiLogIn, FiLogOut, FiHeart, FiFilm } from "react-icons/fi";

const Navbar = () => {
  const { user, loading, signIn, logOut } = useAuth();

  // Common button styles
  const buttonClasses = "flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md";

  return (
    <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-emerald-100/50 dark:border-gray-700">
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Brand Name */}
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-gray-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
        >
          <FiFilm className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span>MovieMap</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="text-gray-500 dark:text-gray-400 animate-pulse text-sm">
              Loading...
            </div>
          ) : user ? (
            <>
              <Link
                to="/wishlist"
                className={`${buttonClasses} bg-emerald-600/90 text-white hover:bg-emerald-700 backdrop-blur-sm`}
              >
                <FiHeart className="w-4 h-4" />
                <span>Wishlist</span>
              </Link>
              <button
                onClick={logOut}
                className={`${buttonClasses} bg-red-600/90 text-white hover:bg-red-700 backdrop-blur-sm`}
                aria-label="Log out"
              >
                <FiLogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <button
              onClick={signIn}
              className={`${buttonClasses} bg-emerald-600/90 text-white hover:bg-emerald-700 backdrop-blur-sm`}
              aria-label="Login with Google"
            >
              <FiLogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;