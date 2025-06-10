import Banner from "@/components/Banner";
import { FeaturedPosts } from "@/components/blog/featuredPosts";
import Projects from "@/components/Projects";
import ServicesBadge from "@/components/ServicesBadge";
import Testimonials from "@/components/Testimonials";
import WhatIDo from "@/components/WhatIDo";
import EventSection from "@/components/Events";
import ProjectsSection from "@/components/projectlist";
import { DemoOne } from "@/components/iconhover";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Banner />
      <ServicesBadge />
      <WhatIDo />
      <EventSection/>
      <ProjectsSection/>
      <FeaturedPosts />
      <DemoOne/>
    </div>
  );
}
