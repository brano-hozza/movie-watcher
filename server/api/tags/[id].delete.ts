import { useTagService } from "~/server/services/tag.service";

export default defineEventHandler(async (event) => {
  // ... Do whatever you want here
  const id = getRouterParam(event, "id");
  if (!id) {
    return {
      statusCode: 400,
      body: "Missing id",
    };
  }
  const service = useTagService();

  const tag = await service.deleteTag(id);
  return tag;
});
