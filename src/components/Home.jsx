import React, { useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setShowInput(false);


    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?s=${input}&apikey=1e9eaaca`
      );
      setMovies(res.data.Search || []);
    } catch (error) {
      console.error("Error", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }

  };



  return (
   <div className="min-h-screen relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6 sm:p-8">
  <div className="flex justify-between items-center mb-12">
    <h2 className="text-4xl font-bold tracking-wider font-roboto text-amber-400">
      Movies
    </h2>

    <div className="relative">
      {!showInput ? (
        <button
          onClick={() => setShowInput(true)}
          className="text-white text-2xl p-3 rounded-full hover:bg-gray-700 transition-colors duration-300"
          aria-label="Open search"
        >
          <FaSearch />
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 bg-gray-800 border border-gray-600 rounded-full px-4 py-2 shadow-lg focus-within:ring-2 focus-within:ring-amber-400 transition-all duration-300"
        >
          <input
            type="text"
            placeholder="Search for Movies..."
            className="w-48 sm:w-64 bg-transparent focus:outline-none text-white placeholder-gray-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-amber-500 text-gray-900 font-semibold rounded-full hover:bg-amber-400 transition-colors duration-300"
          >
            Search
          </button>
        </form>
      )}
    </div>
  </div>

  {loading ? (
    <div className="flex justify-center items-center h-96">
      <p className="text-2xl font-semibold text-gray-400">Loading movies...</p>
    </div>
  ) : (
  
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          id={movie.imdbID}
          title={movie.Title}
          img={movie.Poster}
          year={movie.Year}
        />
      ))}
    </div>
  )}
</div>
  );
};

export default Home;
