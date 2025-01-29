import { Route, Router, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import MoviePage from "./Pages/MoviePage";
import Navbar from "./Components/Navbar";
import MovieDetails from "./Components/MovieDetails";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
