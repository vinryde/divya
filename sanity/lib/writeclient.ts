// lib/sanityWriteClient.ts

import { createClient } from "next-sanity";
import { dataset, projectId, apiVersion } from "../env"; // adjust path

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_WRITE, // Only used server-side
  useCdn: false,
});
