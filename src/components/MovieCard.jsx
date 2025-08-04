import React from "react";
import { NavLink } from "react-router-dom";

const MovieCard = (props) => {
  return (
    <NavLink to={`/movies/${props.id}`}>
      <div className="relative group rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer">
        <img
          src={props.img}
          alt={props.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex flex-col justify-end p-4">
          <h3 className="text-xl font-bold text-white mb-1">{props.title}</h3>
          <p className="text-amber-400 text-sm font-semibold">{props.year}</p>
        </div>
      </div>
    </NavLink>
  );
};

export default MovieCard;