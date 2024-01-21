<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-5xl">My movie list</h1>
    <CreateMovie />
    <MovieList
      :movies="movies"
      :loading="loadingMovies"
      @refresh="refreshMovies"
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
</script>
