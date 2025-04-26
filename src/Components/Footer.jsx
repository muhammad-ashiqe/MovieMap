import React from "react";
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiFilm } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-800/80 backdrop-blur-sm border-t border-emerald-100/50 dark:border-gray-700 text-gray-300 py-10">
      <div className="container mx-auto px-4 md:px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2">
              <FiFilm className="w-6 h-6 text-emerald-400" />
              <h2 className="text-2xl font-bold text-gray-100">MovieMap</h2>
            </div>
            <p className="mt-3 text-sm text-gray-400">
              Your ultimate destination for movies, reviews, and entertainment news.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-100">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-emerald-400 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]">
                  Home
                </a>
              </li>
              <li>
                <a href="/trending" className="text-gray-400 hover:text-emerald-400 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]">
                  Trending Movies
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-emerald-400 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-emerald-400 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-gray-100">Follow Us</h3>
            <div className="flex gap-4 mt-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-emerald-400 rounded-full transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-emerald-900/20">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-emerald-400 rounded-full transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-emerald-900/20">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-emerald-400 rounded-full transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-emerald-900/20">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-emerald-400 rounded-full transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-emerald-900/20">
                <FiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-emerald-100/50 dark:border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} MovieMap. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-3">
            <a href="/privacy" className="hover:text-emerald-400 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]">
              Privacy Policy
            </a>
            <span className="text-gray-500">|</span>
            <a href="/terms" className="hover:text-emerald-400 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;