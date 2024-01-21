<template>
  <div
    class="rounded-md border-neutral-400 border-2 px-4 py-2 flex flex-col gap-2"
  >
    <h2 class="font-bold">Add new movie</h2>
    <hr />
    <span class="flex justify-between">
      <label for="title">*Movie title: </label>
      <input
        id="title"
        type="text"
        class="w-1/2 rounded-md border-neutral-200 border-2 px-2"
        v-model="movieTitle"
      />
    </span>
    <span class="flex justify-between">
      <label for="title">Movie description: </label>
      <textarea
        id="title"
        class="w-1/2 rounded-md border-neutral-200 border-2 px-2"
        v-model="movieDescription"
      />
    </span>
    <button
      class="rounded-md bg-neutral-400 hover:bg-neutral-500 text-neutral-600 px-4 py-2 w-full"
      :class="{
        'cursor-not-allowed': !requirementsFilled,
        'bg-green-400': requirementsFilled,
        'hover:bg-green-500': requirementsFilled,
        'text-white': requirementsFilled,
      }"
      :disabled="!requirementsFilled"
      @click="createMovie"
    >
      Create
    </button>
  </div>
</template>

<script lang="ts" setup>
const movieTitle = ref("");
const movieDescription = ref("");

const requirementsFilled = computed(() => {
  return movieTitle.value.length > 0;
});

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
</script>

<style></style>
