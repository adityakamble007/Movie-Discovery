// src/app/api/omdb/route.js
import { searchOMDb } from '@/api/lib/omdb'; // absolute path from src/

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q) {
    return new Response(JSON.stringify({ error: 'Missing query parameter `q`' }), {
      status: 400,
    });
  }

  const results = await searchOMDb(q);
  if (!results) {
    return new Response(JSON.stringify({ error: 'No movies found.' }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(results), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
