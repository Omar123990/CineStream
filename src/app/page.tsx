import { getMovieVideoKey, getTrindsMovies } from "@/APIS/getMovies";
import HeroSection from "@/components/home/HeroSection";
import Movies from "@/components/home/Movies";
import Trinds from "@/components/home/Trinds";
import { Movie } from "@/types/movie";

export default async function page() {
  const topMovies: Movie[] = await getTrindsMovies();

  const moviesWithTrailers: Movie[] = await Promise.all(
    topMovies.map(async (movie) => {
      const videoKey = await getMovieVideoKey(movie.id);
      return { ...movie, videoKey };
    })
  );
  return (
    <div>
      <HeroSection movies={moviesWithTrailers} />
      <Trinds />
      <Movies />
    </div>
  );
}
