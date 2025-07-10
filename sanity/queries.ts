import { defineQuery } from "next-sanity";
import { clientFetch } from "./lib/client";
import { groq } from "next-sanity";
import { client } from "./lib/client"; // ✅ relative path based on /sanity/queries.ts location
import type { OutreachEvent } from "./types";
import { ProjectDesc } from './types';
import type { NewsItem } from "./types";
import type { TeamMember } from "./types";
import type { AlumniMember } from "./types";
// Post query
const FEATURED_POSTS_QUERY =
  defineQuery(`*[_type == "post" && isFeatured == true && defined(slug.current)]|order(publishedAt desc)[0...$quantity]{
    title,
    "slug":slug.current,
    publishedAt,
    mainImage,
    excerpt,
    author->{
        name, image
    }
}`);

export const getFeaturedPosts = async (quantity: number) => {
  return await clientFetch({
    query: FEATURED_POSTS_QUERY,
    params: { quantity },
  });
};


// Categories query
const CATEGORIES_QUERY = defineQuery(`*[
  _type == "category"
]|order(title asc){
  title,
  "slug": slug.current,
}`);

export const getCategories = async () => {
  return await clientFetch({
    query: CATEGORIES_QUERY,
  });
};

// All Posts query

const ALL_POSTS_QUERY = defineQuery(`*[
  _type == "post"
]|order(publishedAt desc)[0...$quantity]{
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  author->{
    name,
    image,
  },
}`);

export const getAllPosts = async (quantity: number) => {
  return await clientFetch({
    query: ALL_POSTS_QUERY,
    params: { quantity },
  });
};

// Categories Posts query

const CATEGORY_POST = defineQuery(`*[
  _type == "post"
  && select(defined($category) => $category in categories[]->slug.current, true)
]|order(publishedAt desc){
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  author->{
    name,
    image,
  },
}`);

export const getCategoryPost = async (category?: string) => {
  return await clientFetch({
    query: CATEGORY_POST,
    params: {
      category,
    },
  });
};


// Single Post query

const POST_QUERY = defineQuery(`*[
  _type == "post"
  && slug.current == $slug
][0]{
  publishedAt,
  title,
  mainImage,
  excerpt,
  body,
  _id,
  author->{
    name,
    image,
  },
  categories[]->{
    title,
    "slug": slug.current,
  },
  "comments": *[_type == "comment" && post._ref == ^._id && approved == true]{
    name,
    email,
    comment,
    image,
    _id
  }
}
`);

export const getPost = async (slug: string) => {
  return await clientFetch({
    query: POST_QUERY,
    params: { slug },
  });
};

// Other Blogs except the current one
const GET_OTHERS_POSTS_QUERY = defineQuery(`*[
  _type == "post"
  && defined(slug.current)
  && slug.current != $currentSlug
]|order(publishedAt desc)[0...$quantity]{
  publishedAt,
  title,
  mainImage,
  excerpt,
  body,
  slug,
  author->{
    name,
    image,
  },
  categories[]->{
    title,
    "slug": slug.current,
  }
}`);

export const getOtherPosts = async (currentSlug: string, quantity: number) => {
  return await clientFetch({
    query: GET_OTHERS_POSTS_QUERY,
    params: { currentSlug, quantity },
  });
};

// Total Items query

const TOTAL_POSTS_QUERY = defineQuery(`count(*[
  _type == "post"
  && defined(slug.current)
  && (isFeatured != true || defined($category))
  && select(defined($category) => $category in categories[]->slug.current, true)
])`);

export const getProjects = async () => {
  return await client.fetch(
    groq`*[_type == "project"] | order(publishedAt desc){
      _id,
      title,
      href,
      "imageUrl": image.asset->url,
      publishedAt,
      category
    }`
  );
};
export const getOutreachEvents = async (): Promise<OutreachEvent[]> => {
  return await client.fetch(
    groq`*[_type == "event"] | order(date desc) {
      _id,
      title,
      slug,
      fundedBy,
      date,
      dateto,
      collaboration,
      venue,
      description,
      "imageUrl": image.asset->url
    }`
  );
};

export const getOutreachEventBySlug = async (slug: string): Promise<OutreachEvent | null> => {
  return await client.fetch(
    groq`*[_type == "event" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      fundedBy,
      date,
      dateto,
      collaboration,
      venue,
      description,
      "imageUrl": image.asset->url
    }`,
    { slug }
  );
};
export const getNews = async (): Promise<NewsItem[]> => {
  return await client.fetch(
    groq`*[_type == "news"] | order(date desc) {
      _id,
      headline,
      subHeading,
      slug,
      date,
      link,
      description,
      "imageUrl": featuredImage.asset->url
    }`
  );
};

export const getNewsBySlug = async (slug: string): Promise<NewsItem | null> => {
  return await client.fetch(
    groq`*[_type == "news" && slug.current == $slug][0] {
      _id,
      headline,
      subHeading,
      slug,
      date,
      link,
      description,
      "imageUrl": featuredImage.asset->url
    }`,
    { slug }
  );
};


export const getProjectsDesc = async (): Promise<ProjectDesc[]> => {
  return await client.fetch(
    groq`*[_type == "projectdesc"] | order(_createdAt asc) {
      _id,
      title,
      slug,
      sanctionedBudget,
      fundedBy,
      yearsActive,
      status,
      subHeading,
      description,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    }`
  );
};

export const getProjectDescBySlug = async (slug: string): Promise<ProjectDesc | null> => {
  return await client.fetch(
    groq`*[_type == "projectdesc" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      sanctionedBudget,
      fundedBy,
      yearsActive,
      status,
      description,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    }`,
    { slug }
  );
};

export const getTeam = async (): Promise<TeamMember[]> => {
  return await client.fetch(
    groq`*[_type == "team"] | order(name asc) {
      _id,
      name,
      designation,
      email,
      category,
      slug,
      description,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    }`
  );
};

// Get Single Member by Slug
export const getTeamMemberBySlug = async (slug: string): Promise<TeamMember | null> => {
  return await client.fetch(
    groq`*[_type == "team" && slug.current == $slug][0] {
      _id,
      name,
      designation,
      email,
      category,
      slug,
      description,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    }`,
    { slug }
  );
};
export const getProjectAssociates = async (): Promise<TeamMember[]> => {
  return await client.fetch(
    groq`*[_type == "team" && category == "project-associates"] | order(_createdAt asc) {
      _id,
      name,
      designation,
      category,
      email,
      slug,
      description,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    }`
  );
};
export const getPostDoctoralFellows = async (): Promise<TeamMember[]> => {
  return await client.fetch(
    groq`*[_type == "team" && category == "post-doctoral-fellows"] | order(_createdAt asc) {
      _id,
      name,
      designation,
      category,
      email,
      slug,
      description,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    }`
  );
};
export const getInternationalDoctoralScholars = async (): Promise<TeamMember[]> => {
  return await client.fetch(
    groq`*[_type == "team" && category == "international-doctoral-scholars"] | order(_createdAt asc) {
      _id,
      name,
      designation,
      category,
      email,
      slug,
      description,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    }`
  );
};
export const getDoctoralScholars = async (): Promise<TeamMember[]> => {
  return await client.fetch(
    groq`*[_type == "team" && category == "doctoral-scholars"] | order(_createdAt asc) {
      _id,
      name,
      designation,
      category,
      email,
      slug,
      description,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    }`
  );
};
export const getAspireScholars = async (): Promise<TeamMember[]> => {
  return await client.fetch(
    groq`*[_type == "team" && category == "aspire-scholars"] | order(_createdAt asc) {
      _id,
      name,
      designation,
      category,
      email,
      slug,
      description,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    }`
  );
};
export const getAllAlumni = async (): Promise<AlumniMember[]> => {
  return await client.fetch(
    groq`*[_type == "alumni"] | order(_createdAt asc) {
      _id,
      name,
      designation,
      email,
      slug,
      description,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    }`
  );
};

export const getAlumniBySlug = async (slug: string): Promise<AlumniMember | null> => {
  return await client.fetch(
    groq`*[_type == "alumni" && slug.current == $slug][0] {
      _id,
      name,
      designation,
      email,
      slug,
      description,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    }`,
    { slug }
  );
};







export async function getPostsCount(category?: string) {
  return await clientFetch({
    query: TOTAL_POSTS_QUERY,
    params: { category: category ?? null },
  });
}
