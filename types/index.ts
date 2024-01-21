export interface Movie {
  id: string;
  title: string;
  description?: string;
  watched: boolean;
}

export interface CreateMovieDTO {
  title: string;
  description?: string;
}

export interface UpdateMovieDTO {
  title?: string;
  description?: string;
  watched?: boolean;
}
