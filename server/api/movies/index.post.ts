import { useMovieService } from "~/server/services";
import { CreateMovieDTO } from "~/types";

export default defineEventHandler(async (event) => {
  // ... Do whatever you want here
  const dto = await readBody<CreateMovieDTO>(event);
  const movieService = useMovieService();

  const movie = await movieService.createMovie(dto);
  return movie;
});
