import axios from 'axios';

const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGM0NjQyZTA1NTMwMzM5OGUyNTFiNzcyMGIxZWFhZiIsIm5iZiI6MTc2ODkzMDE1MC42MjYsInN1YiI6IjY5NmZiYjY2OWRiZDAwMmZhMmYyYjkwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NiLUjQvpUXiRYWoQPb1aO6_vd6g4CbkqPTbx6PgZy8U";

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${token}`
  },
  params: {
    language: 'en-US',
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  }
});