export interface Movie {
  id: string;
  title: string;
  description?: string;
  watched: boolean;
  tags: string[]; // Tag ids
}

export type CreateMovieDTO = Omit<Movie, "id" | "watched">;

export interface UpdateMovieDTO {
  watched: boolean;
}

export enum TagColor {
  Red,
  Green,
  Blue,
  Yellow,
  Purple,
  Orange,
  Pink,
  Grey,
  Black,
  White,
}
export interface Tag {
  id: string;
  name: string;
  color: TagColor;
}

export type CreateTagDTO = Omit<Tag, "id">;
