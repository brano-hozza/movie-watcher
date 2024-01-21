import { useMovieService } from "~/server/services";
import { CreateMovieDTO } from "~/types";

export default defineEventHandler(async (event) => {
  // ... Do whatever you want here
  const dto = await readBody<CreateMovieDTO>(event);
  const service = useMovieService();

  const movie = await service.createMovie(dto);
  return movie;
});
