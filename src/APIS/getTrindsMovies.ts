import { MovieResponse } from '@/types/movie';
import axios from 'axios';
import { log } from 'console';

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/trending/movie/day',
  params: {language: 'en-US'},
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGM0NjQyZTA1NTMwMzM5OGUyNTFiNzcyMGIxZWFhZiIsIm5iZiI6MTc2ODkzMDE1MC42MjYsInN1YiI6IjY5NmZiYjY2OWRiZDAwMmZhMmYyYjkwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NiLUjQvpUXiRYWoQPb1aO6_vd6g4CbkqPTbx6PgZy8U'
  }
};
export async function getTrindsMovies(): Promise<MovieResponse> {
  try {
    const res = await axios.request<MovieResponse>(options);
    return res.data;
  } catch (error) {
    log(error);
    throw error;
  }
}