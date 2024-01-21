import { useMovieService } from "~/server/services";

export default defineEventHandler(async (event) => {
  const movieService = useMovieService();
  return await movieService.getMovies();
});
