import { useMovieService } from "~/server/services";

export default defineEventHandler(async (event) => {
  const service = useMovieService();
  return await service.getMovies();
});
