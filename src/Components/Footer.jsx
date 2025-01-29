import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold text-white">MovieVerse</h2>
            <p className="mt-2 text-sm text-gray-400">
              Your ultimate destination for movies, reviews, and entertainment news.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="/" className="hover:text-indigo-400 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/trending" className="hover:text-indigo-400 transition">
                  Trending Movies
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-indigo-400 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-indigo-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="flex space-x-4 mt-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-indigo-400 transition text-xl">
                <FaFacebook />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-indigo-400 transition text-xl">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-indigo-400 transition text-xl">
                <FaTwitter />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-indigo-400 transition text-xl">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} MovieVerse. All rights reserved.</p>
          <p className="mt-1">
            <a href="/privacy" className="hover:text-indigo-400 transition">Privacy Policy</a> | 
            <a href="/terms" className="ml-2 hover:text-indigo-400 transition">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
