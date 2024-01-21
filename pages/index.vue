<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-5xl">My movie list</h1>
    <CreateMovie :loading="isLoading" :tags="tags ?? []" @refresh="refresh" />
    <MovieList
      :movies="movies ?? []"
      :tags="tags ?? []"
      :loading="isLoading"
      @refresh="refresh"
    />
  </div>
</template>
<script setup lang="ts">
import CreateMovie from "~/components/movies/CreateMovie.vue";
import MovieList from "~/components/movies/MovieList.vue";

const {
  data: movies,
  pending: loadingMovies,
  refresh: refreshMovies,
} = useFetch("/api/movies");

const {
  data: tags,
  pending: loadingTags,
  refresh: refreshTags,
} = useFetch("/api/tags");

const refresh = async () => {
  await Promise.all([refreshMovies(), refreshTags()]);
};

const isLoading = computed(() => {
  return loadingMovies.value || loadingTags.value;
});
</script>
