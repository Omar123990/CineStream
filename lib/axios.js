import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN}`
  }
});

export default axiosInstance;