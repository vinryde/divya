import { type SchemaTypeDefinition } from "sanity";
import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { commentType } from "./commentType";
import { eventType } from "./eventType";
import { project } from "./project";
import { newsType } from "./newsType";
import { teamType } from "./teamType"; 
import { alumniType } from "./alumini";
import { contactSubmission } from './contactSubmission';
import { publication } from "./publications";
import { shuffleImageType } from "./shuffleImage";
import { dragImage } from "./dragimage";



export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType,commentType,eventType,project,newsType,teamType,alumniType,contactSubmission,publication,shuffleImageType,dragImage],
};
