"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { getProjectsDesc } from "@/sanity/queries";
import type { ProjectDesc } from "@/sanity/types";

const ITEMS_PER_PAGE = 6;

export const ProjectStatusGrid: React.FC = () => {
  const [runningProjects, setRunningProjects] = useState<ProjectDesc[]>([]);
  const [closedProjects, setClosedProjects] = useState<ProjectDesc[]>([]);

  const [runningVisibleCount, setRunningVisibleCount] = useState(ITEMS_PER_PAGE);
  const [closedVisibleCount, setClosedVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjectsDesc();
      setRunningProjects(data.filter((p) => p.status === "running"));
      setClosedProjects(data.filter((p) => p.status === "closed"));
    };
    fetchProjects();
  }, []);

  const loadMoreRunning = () => {
    setRunningVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const loadMoreClosed = () => {
    setClosedVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const visibleRunning = runningProjects.slice(0, runningVisibleCount);
  const visibleClosed = closedProjects.slice(0, closedVisibleCount);

  const hasMoreRunning = runningVisibleCount < runningProjects.length;
  const hasMoreClosed = closedVisibleCount < closedProjects.length;

  return (
    <section className="py-10">
      <div className="mx-auto md:px-16 sm:px-4 space-y-12">
        {/* Running Projects */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Running Projects</h2>
          <p className="text-md max-w-3xl mb-6">
            Explore our ongoing research initiatives driving innovation in education, sustainability, and technology across diverse learning communities.
          </p>
          {visibleRunning.length > 0 ? (
            <>
              <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
                {visibleRunning.map((project) => (
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
              {hasMoreRunning && (
                <div className="mt-6 text-center">
                  <button
                    onClick={loadMoreRunning}
                    className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-100"
                  >
                    Load More Running Projects
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-500">No running projects found.</p>
          )}
        </div>

        {/* Closed Projects */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Closed Projects</h2>
          <p className="text-md max-w-3xl mb-6">
            Review completed projects that have shaped impactful practices and contributed to the advancement of educational research and outreach.
          </p>
          {visibleClosed.length > 0 ? (
            <>
              <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
                {visibleClosed.map((project) => (
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
              {hasMoreClosed && (
                <div className="mt-6 text-center">
                  <button
                    onClick={loadMoreClosed}
                    className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-100"
                  >
                    Load More Closed Projects
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-500">No closed projects found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectStatusGrid;
