export default function MovieCard({ movie }) {
  return (
    <div className="border border-gray-300 p-4 bg-blue-300 rounded-2xl text-center shadow-sm hover:shadow-md transition">
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpg'}
        alt={movie.Title}
        className="w-full h-auto rounded-md object-cover"
      />
      <h3 className="mt-2 text-lg font-semibold">{movie.Title}</h3>
      <p className="text-gray-600">{movie.Year}</p>
      <p className="italic text-sm text-gray-500">{movie.Type}</p>
    </div>
  );
}
