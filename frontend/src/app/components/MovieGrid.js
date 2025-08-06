// src/app/components/MovieGrid.js
'use client';
import Link from 'next/link';

export default function MovieGrid({ movies }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <Link key={movie.imdbID} href={`/movie/${movie.imdbID}`}>
          <div className="bg-white text-black rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200">
            <img src={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.jpg'} alt={movie.Title} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{movie.Title}</h3>
              <p className="text-sm text-gray-700">{movie.Year}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
