import { useMovieService } from "~/server/services";
import { UpdateMovieDTO } from "~/types";

export default defineEventHandler(async (event) => {
  // ... Do whatever you want here
  const id = getRouterParam(event, "id");
  if (!id) {
    return {
      statusCode: 400,
      body: "Missing id",
    };
  }
  const dto = await readBody<UpdateMovieDTO>(event);
  const movieService = useMovieService();

  const movie = await movieService.updateMovie(id, dto);
  return movie;
});
