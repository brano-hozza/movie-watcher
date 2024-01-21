import { useTagService } from "~/server/services/tag.service";

export default defineEventHandler(async (event) => {
  const service = useTagService();
  return await service.getTags();
});
