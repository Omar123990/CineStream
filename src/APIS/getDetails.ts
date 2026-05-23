import axios from 'axios';

export async function getDetails(id: string, type: 'movie' | 'tv') {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/${type}/${id}`,
    params: {
      language: 'en-US',
      append_to_response: 'videos,credits,recommendations'
    },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN}`
    }
  };

  try {
    const res = await axios.request(options);
    return res.data;
  } catch (err) {
    console.error("Fetch Details Error:", err);
    return null;
  }
}