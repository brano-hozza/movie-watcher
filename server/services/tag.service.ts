import crypto from "crypto";
import { CreateTagDTO, Tag } from "~/types";
import { useMovieService } from "./movie.service";

export const useTagService = () => {
  const storage = useStorage("vercel");
  const createTag = async (dto: CreateTagDTO): Promise<Tag> => {
    const id = crypto.randomUUID();
    const newTag: Tag = {
      ...dto,
      id,
    };
    const tags = await getTags();
    tags.push(newTag);
    await storage.setItem("watcher:tags", tags);
    return newTag;
  };

  const getTags = async (): Promise<Tag[]> => {
    return (await storage.getItem<Tag[]>("watcher:tags")) ?? [];
  };

  const deleteTag = async (id: string): Promise<void> => {
    const tags = await getTags();
    const newTags = tags.filter((tag) => tag.id !== id);

    const movieService = useMovieService();
    const movies = await movieService.getMovies();
    const newMovies = movies.map((movie) => {
      movie.tags = movie.tags.filter((tag) => tag !== id);
      return movie;
    });
    await storage.setItem("watcher:movies", newMovies);
    await storage.setItem("watcher:tags", newTags);
  };

  return {
    createTag,
    getTags,
    deleteTag,
  };
};
