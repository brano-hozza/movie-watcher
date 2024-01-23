import crypto from "crypto";
import { CreateMovieDTO, Movie } from "~/types";
import { UpdateMovieDTO } from "../../types";

export const useMovieService = () => {
  const storage = useStorage("vercel");
  const createMovie = async (movie: CreateMovieDTO): Promise<Movie> => {
    const id = crypto.randomUUID();
    const newMovie: Movie = {
      ...movie,
      id,
      watched: false,
      tags: [],
    };
    const movies = await getMovies();
    movies.push(newMovie);
    await storage.setItem("watcher:movies", movies);
    return newMovie;
  };

  const getMovies = async (): Promise<Movie[]> => {
    const movies = await storage.getItem<Movie[]>("watcher:movies");
    return movies ?? [];
  };

  const deleteMovie = async (id: string): Promise<void> => {
    const movies = await getMovies();
    const newMovies = movies.filter((movie) => movie.id !== id);
    await storage.setItem("watcher:movies", newMovies);
  };

  const updateMovie = async (
    id: string,
    movie: UpdateMovieDTO
  ): Promise<void> => {
    const movies = await getMovies();
    const newMovies = movies.map((m) => {
      if (m.id === id) {
        m.watched = movie.watched;
      }
      return m;
    });
    await storage.setItem("watcher:movies", newMovies);
  };

  return {
    createMovie,
    getMovies,
    deleteMovie,
    updateMovie,
  };
};
