<template>
  <div
    class="rounded-md border-neutral-400 border-2 px-4 py-2 flex flex-col gap-2"
  >
    <h2 class="font-bold">Movies</h2>
    <hr />
    <div v-if="loading">Loading...</div>
    <div v-else-if="!movies || movies.length === 0">No movies</div>
    <ul v-else>
      <li v-for="movie in movies" :key="movie.id" class="flex gap-2">
        <span :class="{ 'line-through': movie.watched }" class="group/title">
          &rarr; {{ movie.title }}
          <span
            v-if="movie.description"
            class="hidden group-hover/title:block w-1/2 h-20 bg-white rounded-md border-2 border-neutral-400 p-2 absolute"
          >
            <h3 class="font-bold text-lg">Description:</h3>
            {{ movie.description }}
          </span>
        </span>
        <button class="text-red-400" @click="deleteMovie(movie.id)">x</button>
        <button
          v-if="!movie.watched"
          class="text-green-400"
          @click="watchMovie(movie.id)"
        >
          <Icon name="uil:eye" />
        </button>
        <button v-else class="text-green-400" @click="unwatchMovie(movie.id)">
          <Icon name="uil:eye-slash" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { UpdateMovieDTO } from "~/types";

const props = defineProps<{
  movies: Movie[];
  loading: boolean;
}>();

const emit = defineEmits<{
  refresh: () => Promise<void>;
}>();

const deleteMovie = async (id: string) => {
  const { data } = await useFetch(`/api/movies/${id}`, {
    method: "DELETE",
  });
  await emit("refresh");
};

const watchMovie = async (id: string) => {
  const dto: UpdateMovieDTO = {
    watched: true,
  };
  const { data } = await useFetch(`/api/movies/${id}`, {
    method: "PUT",
    body: JSON.stringify(dto),
  });
  await emit("refresh");
};

const unwatchMovie = async (id: string) => {
  const dto: UpdateMovieDTO = {
    watched: false,
  };
  const { data } = await useFetch(`/api/movies/${id}`, {
    method: "PUT",
    body: JSON.stringify(dto),
  });
  await emit("refresh");
};
</script>

<style></style>
