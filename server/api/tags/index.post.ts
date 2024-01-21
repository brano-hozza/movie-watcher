import { useTagService } from "~/server/services/tag.service";
import { CreateTagDTO } from "~/types";

export default defineEventHandler(async (event) => {
  // ... Do whatever you want here
  const dto = await readBody<CreateTagDTO>(event);
  const service = useTagService();

  const tag = await service.createTag(dto);
  return tag;
});
