<template>
  <h1>Main page</h1>
  <div
    class="w-1/2 h-56 rounded-md border-neutral-400 border-2 px-4 flex flex-col justify-evenly gap-2"
  >
    <h2 class="font-bold">Add new movie</h2>
    <span class="flex justify-between">
      <label for="title">*Movie title: </label>
      <input
        id="title"
        type="text"
        class="w-1/2 rounded-md border-neutral-200 border-2"
        v-model="movieTitle"
      />
    </span>
    <span class="flex justify-between">
      <label for="title">Movie description: </label>
      <textarea
        id="title"
        class="w-1/2 rounded-md border-neutral-200 border-2"
        v-model="movieDescription"
      />
    </span>
    <button
      class="rounded-md bg-neutral-400 px-4 py-2 w-full"
      @click="createMovie"
    >
      Create
    </button>
  </div>

  <div class="w-1/2 h-56 rounded-md border-neutral-400 border-2 px-4">
    <h2 class="font-bold">Movies</h2>
    <div v-if="loadingMovies">Loading...</div>
    <div v-else-if="!movies || movies.length === 0">No movies</div>
    <div v-else>
      <ul>
        <li v-for="movie in movies" :key="movie.id" class="flex gap-2">
          - {{ movie.title }}
          <button class="text-red-400" @click="deleteMovie(movie.id)">x</button>
          <button
            v-if="!movie.watched"
            class="text-green-400 rounded-md border-2 border-green-300"
            @click="watchMovie(movie.id)"
          >
            Watched
          </button>
          <button
            v-else
            class="text-green-400 rounded-md border-2 border-green-300"
            @click="unwatchMovie(movie.id)"
          >
            Unwatched
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { CreateMovieDTO, UpdateMovieDTO } from "~/types";

const movieTitle = ref("");
const movieDescription = ref("");

const {
  data: movies,
  pending: loadingMovies,
  refresh: refreshMovies,
} = useFetch("/api/movies");

const createMovie = async () => {
  console.log(
    `Creating movie with title: ${movieTitle.value} and description: ${movieDescription.value}`
  );
  const dto: CreateMovieDTO = {
    title: movieTitle.value,
    description: movieDescription.value,
  };
  const { data } = await useFetch("/api/movies", {
    method: "POST",
    body: JSON.stringify(dto),
  });
  await refreshMovies();
};

const deleteMovie = async (id: string) => {
  const { data } = await useFetch(`/api/movies/${id}`, {
    method: "DELETE",
  });
  await refreshMovies();
};

const watchMovie = async (id: string) => {
  const dto: UpdateMovieDTO = {
    watched: true,
  };
  const { data } = await useFetch(`/api/movies/${id}`, {
    method: "PUT",
    body: JSON.stringify(dto),
  });
  await refreshMovies();
};

const unwatchMovie = async (id: string) => {
  const dto: UpdateMovieDTO = {
    watched: false,
  };
  const { data } = await useFetch(`/api/movies/${id}`, {
    method: "PUT",
    body: JSON.stringify(dto),
  });
  await refreshMovies();
};
</script>
