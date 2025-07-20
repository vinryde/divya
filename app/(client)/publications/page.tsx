import { HeroSectionPubs } from "@/components/heroPubs";
import { FeaturedPosts } from "@/components/blog/featuredPosts";
import {PublicationGrid} from "@/components/publications";
export default function pubs() {
  return (
    <div>
      <HeroSectionPubs />
      <PublicationGrid />
    </div>
  )
}