import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true); 
      try {
        const res = await axios.get(
          `https://www.omdbapi.com/?i=${id}&apikey=1e9eaaca`
        );
        setMovie(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

 
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <p className="text-2xl font-semibold text-gray-400 animate-pulse">
          Loading movie details...
        </p>
      </div>
    );
  }


  if (!movie || movie.Response === "False") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <p className="text-2xl font-semibold text-red-500">
          Movie not found
        </p>
      </div>
    );
  }

  
  return (
    <div className="flex min-h-screen items-center justify-center w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2 bg-gray-800 bg-opacity-50 rounded-xl shadow-2xl overflow-hidden backdrop-filter backdrop-blur-lg border border-gray-700">
        <div className="w-full h-full">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="p-6 text-amber-50">
          <h1 className="mb-3 text-3xl font-bold text-amber-400 leading-tight">
            {movie.Title}
          </h1>
          <p className="mb-4 text-gray-300 text-base leading-relaxed">
            {movie.Plot}
          </p>

          <div className="space-y-2 text-base">
            <p>
              <strong className="font-semibold text-amber-300">Year:</strong>
              <span className="ml-2 text-gray-300">{movie.Year}</span>
            </p>
            <p>
              <strong className="font-semibold text-amber-300">Genre:</strong>
              <span className="ml-2 text-gray-300">{movie.Genre}</span>
            </p>
            <p>
              <strong className="font-semibold text-amber-300">
                Director:
              </strong>
              <span className="ml-2 text-gray-300">{movie.Director}</span>
            </p>
            <p>
              <strong className="font-semibold text-amber-300">
                IMDB Rating:
              </strong>
              <span className="ml-2 text-gray-300">{movie.imdbRating}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;