"use client";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getProjects } from "@/sanity/queries";

type Project = {
  _id: string;
  title: string;
  href: string;
  imageUrl: string;
  publishedAt: string;
  category: string;
};

const Projects = ({ className }: { className?: string }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  return (
    <div className={cn("py-20 md:py-24", className)}>
      <Container>
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-4xl font-bold tracking-wide">My Projects</h1>
          <p className="max-w-3xl text-center">
            These projects are fetched from Sanity Studio dynamically.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
          {projects?.map((item) => (
            <div key={item._id} className="bg-slate-400">
              <div className="overflow-hidden relative bg-black w-full h-72 group">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
               </div>
              <div className="space-y-5 mt-2">
                <p className="font-semibold text-primary/70 text-sm">
                  {new Date(item.publishedAt).toLocaleDateString()} / {item.category}
                </p>
                <h2 className="text-xl font-bold">{item.title}</h2>
                <Link href={item.href}>
                  <button className="text-sm font-bold hover:text-darkOrange hoverEffect">
                    View Project
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Projects;
