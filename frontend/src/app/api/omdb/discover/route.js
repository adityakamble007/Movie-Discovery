// src/app/api/omdb/discover/route.js
import { searchOMDb } from '@/api/lib/omdb';

export async function GET() {
  const tmdbBearer = process.env.TMDB_BEARER_TOKEN;
  const tmdbUrl = 'https://api.themoviedb.org/3/trending/movie/week';

  try {
    const tmdbRes = await fetch(tmdbUrl, {
      headers: {
        Authorization: `Bearer ${tmdbBearer}`,
        accept: 'application/json',
      },
    });

    if (!tmdbRes.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch TMDB' }), { status: 500 });
    }

    const { results } = await tmdbRes.json();
    const firstFiveTitles = results.slice(0, 5).map((movie) => movie.title);

    // Use your version of searchOMDb, which returns .Search (array)
    const omdbResultsNested = await Promise.all(
      firstFiveTitles.map(async (title) => {
        const result = await searchOMDb(title);
        return result || [];
      })
    );

    // Flatten and filter nulls
    const omdbResults = omdbResultsNested.flat().filter(Boolean);

    return new Response(JSON.stringify(omdbResults), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
