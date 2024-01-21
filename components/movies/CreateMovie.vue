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
    <span class="flex justify-between">
      <label for="title">Movie tags: </label>
      <ClientOnly>
        <div v-if="!loading" class="flex gap-2">
          <button
            v-for="tag in tags"
            :key="tag.id"
            class="rounded-md bg-neutral-400 text-white px-2 py-1"
            :class="[getTagColor(tag.id), getSelectedClasses(tag.id)]"
            @click="selectTag(tag.id)"
          >
            {{ tag.name }}

            <button class="text-red-400" @click="deleteTag(tag.id)">
              <Icon name="uil:ban" size="24" />
            </button>
          </button>
          <button
            class="rounded-md bg-white hover:bg-neutral-500 text-black border-2 border-neutral-300 px-2 py-1"
            @click="creatingTag = true"
          >
            Create tag
          </button>
        </div>

        <CreateTagModal v-if="creatingTag" :tags="tags" @close="closeModal" />
      </ClientOnly>
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
import CreateTagModal from "~/components/tags/CreateTagModal.vue";
import { TagColor, type CreateMovieDTO, type Tag } from "~/types";

const creatingTag = ref(false);

const props = defineProps<{
  loading: boolean;
  tags: Tag[];
}>();

const emit = defineEmits<{
  (event: "refresh"): Promise<void>;
  (event: "createTag"): Promise<void>;
}>();

const movieTitle = ref("");
const movieDescription = ref("");

const selectedTags = ref<string[]>([]);

const getTagColor = (tagId: string) => {
  const tag = props.tags.find((tag) => tag.id === tagId);
  if (!tag) return "bg-neutral-400";
  switch (tag.color) {
    case TagColor.Red:
      return "bg-red-400";
    case TagColor.Blue:
      return "bg-blue-400";
    case TagColor.Green:
      return "bg-green-400";
    case TagColor.Yellow:
      return "bg-yellow-400";
    case TagColor.Purple:
      return "bg-purple-400";
    case TagColor.Pink:
      return "bg-pink-400";
    case TagColor.Orange:
      return "bg-orange-400";
    case TagColor.Black:
      return "bg-black";
    case TagColor.White:
      return "bg-white";
  }
};

const selectTag = (id: string) => {
  if (selectedTags.value.includes(id)) {
    selectedTags.value = selectedTags.value.filter((tagId) => tagId !== id);
  } else {
    selectedTags.value = [...selectedTags.value, id];
  }
};

const getSelectedClasses = (id: string) => {
  return selectedTags.value.includes(id)
    ? "border-2 border-black"
    : "text-neutral-600";
};

const requirementsFilled = computed(() => {
  return movieTitle.value.length > 0;
});

const closeModal = async () => {
  creatingTag.value = false;
  await emit("refresh");
};

const createMovie = async () => {
  const dto: CreateMovieDTO = {
    title: movieTitle.value,
    description: movieDescription.value,
    tags: selectedTags.value,
  };
  await useFetch("/api/movies", {
    method: "POST",
    body: JSON.stringify(dto),
  });
  movieTitle.value = "";
  movieDescription.value = "";
  selectedTags.value = [];
  await emit("refresh");
};

const deleteTag = async (id: string) => {
  await useFetch(`/api/tags/${id}`, {
    method: "DELETE",
  });
  await emit("refresh");
};
</script>
