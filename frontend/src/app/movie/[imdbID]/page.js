import axios from 'axios';

export default async function MovieDetail({ params }) {
  const { imdbID } = params;

  try {
    const res = await axios.get(`http://www.omdbapi.com/?i=${imdbID}&apikey=cfc3abb2`);
    const movie = res.data;

    if (movie.Response === 'False') {
      return <div className="p-10 text-black">Movie not found.</div>;
    }

    return (
      <div className="p-10 text-black bg-blue-700 min-h-screen">
        <div className="flex flex-col p-4 rounded-2xl bg-blue-300 md:flex-row gap-8">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.jpg'}
            alt={movie.Title}
            className="w-full md:w-64 h-auto rounded-lg"
          />
          <div>
            <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
            <p className="text-black mb-1"><strong>Year:</strong> {movie.Year}</p>
            <p className="text-black mb-1"><strong>Genre:</strong> {movie.Genre}</p>
            <p className="text-black mb-1"><strong>Director:</strong> {movie.Director}</p>
            <p className="text-black mb-1"><strong>Actors:</strong> {movie.Actors}</p>
            <p className="text-black mb-1"><strong>Plot:</strong> {movie.Plot}</p>
            <p className="text-black mb-1"><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return <div className="p-10 text-black">Error loading movie data.</div>;
  }
}
