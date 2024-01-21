<template>
  <div class="fixed w-full h-full top-0 left-0 bg-opacity-25 bg-black z-50 p-4">
    <div class="w-full h-full flex justify-center items-center">
      <div class="w-full md:w-1/2 bg-white rounded-md py-2">
        <div class="w-full h-10 flex justify-center items-center text-2xl">
          Create tag
        </div>
        <div class="w-full h-full p-4 flex flex-col gap-2">
          <input
            class="h-10 rounded-md border border-gray-300 px-4 py-2"
            v-model="tagName"
            placeholder="Tag name"
          />
          <select
            class="border-gray-300 border rounded-md p-2"
            name="color"
            id="tag-color"
            v-model="tagColor"
          >
            <option
              :value="TagColor.Black"
              :selected="tagColor === TagColor.Black"
            >
              Black
            </option>
            <option
              :value="TagColor.Blue"
              :selected="tagColor === TagColor.Blue"
            >
              Blue
            </option>
            <option
              :value="TagColor.Green"
              :selected="tagColor === TagColor.Green"
            >
              Green
            </option>
            <option
              :value="TagColor.Orange"
              :selected="tagColor === TagColor.Orange"
            >
              Orange
            </option>
            <option
              :value="TagColor.Pink"
              :selected="tagColor === TagColor.Pink"
            >
              Pink
            </option>
            <option
              :value="TagColor.Purple"
              :selected="tagColor === TagColor.Purple"
            >
              Purple
            </option>
            <option :value="TagColor.Red" :selected="tagColor === TagColor.Red">
              Red
            </option>
            <option
              :value="TagColor.White"
              :selected="tagColor === TagColor.White"
            >
              White
            </option>
            <option
              :value="TagColor.Yellow"
              :selected="tagColor === TagColor.Yellow"
            >
              Yellow
            </option>
          </select>
          <div class="w-full h-10 flex justify-center items-center">
            <button
              class="rounded-md bg-neutral-400 hover:bg-neutral-500 text-neutral-600 px-4 py-2 w-full"
              :class="{
                'cursor-not-allowed': !requirementsFilled,
                'bg-green-400': requirementsFilled,
                'hover:bg-green-500': requirementsFilled,
                'text-white': requirementsFilled,
              }"
              :disabled="!requirementsFilled"
              @click="createTag"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { TagColor, type Tag } from "~/types";

const props = defineProps<{
  tags: Tag[];
}>();

const emit = defineEmits<{
  (event: "close"): void;
}>();

const tagName = ref("");
const tagColor = ref(TagColor.Black);

const requirementsFilled = computed(() => {
  return (
    tagName.value.length > 0 &&
    props.tags.find((t) => t.name === tagName.value) === undefined
  );
});

const createTag = async () => {
  await useFetch("/api/tags", {
    method: "POST",
    body: JSON.stringify({
      name: tagName.value,
      color: tagColor.value,
    }),
  });
  tagName.value = "";
  tagColor.value = TagColor.Black;
  emit("close");
};

onMounted(() => {
  tagName.value = "";
});
</script>
