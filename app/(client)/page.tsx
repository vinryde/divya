import Banner from "@/components/Banner";
import { FeaturedPosts } from "@/components/blog/featuredPosts";
import Projects from "@/components/Projects";
import ServicesBadge from "@/components/ServicesBadge";
import Testimonials from "@/components/Testimonials";
import WhatIDo from "@/components/WhatIDo";
import EventSection from "@/components/Events";
import ProjectsSection from "@/components/projectlist";
import { DemoOne } from "@/components/iconhover";
import { HeroSectionDemo } from "@/components/herosectiontsx";
import { Feature1 } from "@/components/feature-1";
import { AemoOne } from "@/components/aboutsenan";
import NewsSection from "@/components/News";
import { GlowingEffectDemo } from "@/components/bentocard";
import AboutPage from "@/components/aboutme";
import ContactForm from "@/components/contactform";
export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <HeroSectionDemo />
      <WhatIDo />
      <NewsSection/>
      <AboutPage/>
      <ServicesBadge />
      <GlowingEffectDemo/>
      <ContactForm/>
    </div>
  );
}
