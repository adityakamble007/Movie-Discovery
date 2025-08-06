'use client';

export default function SearchBar({ query, setQuery, loading, handleSearch }) {
  return (
    <form
      onSubmit={handleSearch}
      className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-3"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie or TV show"
        className="px-4 py-2 w-full sm:w-[300px] border border-gray-300 rounded-md bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded-md text-white ${
          loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
