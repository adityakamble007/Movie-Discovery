// src/api/lib/omdb.js
import axios from 'axios';

export async function searchOMDb(query) {
  try {
    const res = await axios.get(
      `http://www.omdbapi.com/?s=${query}&apikey=cfc3abb2`
    );

    if (res.data.Response === 'False') return null;
    return res.data.Search;
  } catch (error) {
    console.error('OMDb API search error:', error);
    return null;
  }
}
