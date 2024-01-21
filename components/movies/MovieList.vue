<template>
  <div
    class="rounded-md border-neutral-400 border-2 px-4 py-2 flex flex-col gap-2"
  >
    <h2 class="font-bold">Movies</h2>
    <hr />
    <div v-if="loading">Loading...</div>
    <div v-else-if="sortedMovies.length === 0">No movies</div>
    <ul v-else>
      <li
        v-for="movie in sortedMovies"
        :key="movie.id"
        class="flex gap-2 items-center"
      >
        <span :class="{ 'line-through': movie.watched }" class="group/title">
          &rarr; {{ movie.title }}
          <span v-if="movie.tags.length" class="text-sm">
            ({{ movie.tags.map((t) => getTag(t)!.name).join(", ") }})
          </span>
          <span
            v-if="movie.description"
            class="hidden group-hover/title:block w-1/2 h-20 bg-white rounded-md border-2 border-neutral-400 p-2 absolute"
          >
            <h3 class="font-bold text-lg">Description:</h3>
            {{ movie.description }}
          </span>
        </span>
        <button class="text-red-400" @click="deleteMovie(movie.id)">
          <Icon name="uil:ban" size="24" />
        </button>
        <button
          v-if="!movie.watched"
          class="text-green-400"
          @click="toggleMovie(movie)"
        >
          <Icon name="uil:eye" size="24" />
        </button>
        <button v-else class="text-green-400" @click="toggleMovie(movie)">
          <Icon name="uil:eye-slash" size="24" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { Movie, Tag, UpdateMovieDTO } from "~/types";

const props = defineProps<{
  movies: Movie[];
  tags: Tag[];
  loading: boolean;
}>();

const emit = defineEmits<{
  (event: "refresh"): Promise<void>;
}>();

const getTag = (id: string) => {
  return props.tags.find((t) => t.id === id);
};

const deleteMovie = async (id: string) => {
  await useFetch(`/api/movies/${id}`, {
    method: "DELETE",
  });
  await emit("refresh");
};

const sortedMovies = computed(() => {
  return props.movies.sort((a, b) => {
    if (a.watched && !b.watched) {
      return 1;
    }
    if (!a.watched && b.watched) {
      return -1;
    }
    return 0;
  });
});

const toggleMovie = async (movie: Movie) => {
  const dto: UpdateMovieDTO = {
    watched: !movie.watched,
  };
  await useFetch(`/api/movies/${movie.id}`, {
    method: "PUT",
    body: JSON.stringify(dto),
  });
  await emit("refresh");
};
</script>

<style></style>
