import { type SchemaTypeDefinition } from "sanity";
import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { commentType } from "./commentType";
import { projectType } from "./projectType";
import { eventType } from "./eventType";
import { project } from "./project";
import { newsType } from "./newsType";


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType,commentType, projectType,eventType,project,newsType],
};
