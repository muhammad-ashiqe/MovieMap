import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import MovieDetails from './Components/MovieDetails';
import Wishlist from './Pages/Wishlist';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { AuthProvider } from './context/Auth';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route
            path="/wishlist"
            element={
              <PrivateRoute>
                <Wishlist />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
