import { useMovieService } from "~/server/services";

export default defineEventHandler(async (event) => {
  // ... Do whatever you want here
  const id = getRouterParam(event, "id");
  if (!id) {
    return {
      statusCode: 400,
      body: "Missing id",
    };
  }
  const movieService = useMovieService();

  const movie = await movieService.deleteMovie(id);
  return movie;
});
