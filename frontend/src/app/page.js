'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';

export default function Home() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  // Fetch trending movies on first render
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get('/api/omdb/discover');
        setMovies(res.data);
        setIsSearch(false); // ensure we mark it as not a search
      } catch (err) {
        setError({ message: 'Failed to load trending movies.' });
      }
    };

    fetchTrending();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setMovies(null);

    if (!query.trim()) {
      setError({ message: 'Please enter a movie name.' });
      return;
    }

    setLoading(true);
    setIsSearch(true);

    try {
      const res = await axios.get('/api/omdb', {
        params: { q: query },
      });
      setMovies(res.data);
    } catch (err) {
      setError(err.response?.data || { message: 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-blue-700 font-sans min-h-screen text-white">
      <SearchBar
        query={query}
        setQuery={setQuery}
        loading={loading}
        handleSearch={handleSearch}
      />

      {error && (
        <p className="text-red-300 font-medium mb-4">Error: {error.message}</p>
      )}

      {movies && (
        <>
          <h2 className="text-2xl font-bold mb-4">
            {isSearch ? '🔍 Search Results' : '🔥 Trending Movies'}
          </h2>
          {movies.length > 0 ? (
            <MovieGrid movies={movies} />
          ) : (
            <p className="text-gray-200 mt-4">No results found.</p>
          )}
        </>
      )}
    </div>
  );
}
