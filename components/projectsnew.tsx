"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { getProjectsDesc } from "@/sanity/queries";
import type { ProjectDesc } from "@/sanity/types";

export const ProjectStatusGrid: React.FC = () => {
  const [runningProjects, setRunningProjects] = useState<ProjectDesc[]>([]);
  const [closedProjects, setClosedProjects] = useState<ProjectDesc[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjectsDesc();
      setRunningProjects(data.filter((p) => p.status === "running"));
      setClosedProjects(data.filter((p) => p.status === "closed"));
    };
    fetchProjects();
  }, []);

  return (
    <section className="py-10">
      <div className="container mx-auto px-4 space-y-12">
        {/* Running Projects */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Running Projects</h2>
          <p className="text-md max-w-3xl mb-6 ">Explore our ongoing research initiatives driving innovation in education, sustainability, and technology across diverse learning communities.</p>
          {runningProjects.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
              {runningProjects.map((project) => (
                <Card
                  key={project._id}
                  variant="inner"
                  title={project.title}
                  subHeading={project.subHeading}
                  sanctionedBudget={project.sanctionedBudget}
                  fundedBy={project.fundedBy}
                  yearsActive={project.yearsActive}
                  linkUrl={`/projects/${project.slug.current}`}
                  className="max-w-[400px] bg-background"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No running projects found.</p>
          )}
        </div>

        {/* Closed Projects */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Closed Projects</h2>
          <p className="text-md max-w-3xl mb-6 ">Review completed projects that have shaped impactful practices and contributed to the advancement of educational research and outreach.</p>
          {closedProjects.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
              {closedProjects.map((project) => (
                <Card
                  key={project._id}
                  variant="plus"
                  title={project.title}
                  subHeading={project.subHeading}
                  sanctionedBudget={project.sanctionedBudget}
                  fundedBy={project.fundedBy}
                  yearsActive={project.yearsActive}
                  linkUrl={`/projects/${project.slug.current}`}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No closed projects found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectStatusGrid;
