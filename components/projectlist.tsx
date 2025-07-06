'use client';

import React, { useEffect, useState } from "react";
import { getProjectsDesc } from "@/sanity/queries";
import type { ProjectDesc } from "@/sanity/types";
import Link from "next/link";

const ProjectsSection = () => {
  const [projects, setProjects] = useState<ProjectDesc[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjectsDesc();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <section className="py-16 px-6 flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold">Projects</h1>
      <p className="max-w-3xl text-center text-gray-700">
        Institutional and externally funded projects focused on innovation, sustainability, and impact-driven research and development.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl">
        {projects.length === 0 ? (
          <p className="text-gray-500">No projects available.</p>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-md shadow border p-6 max-w-2xl w-full"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {project.title}
              </h2>

              <p className="text-sm text-gray-700 mt-1">
                <strong>Funded By:</strong> {project.fundedBy || "N/A"} •{" "}
                <strong>Status:</strong>{" "}
                {project.status === "running" ? "🟢 Running" : "🔴 Closed"}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                <strong>Years Active:</strong> {project.yearsActive || "TBD"} •{" "}
                <strong>Budget:</strong> ₹
                {project.sanctionedBudget?.toLocaleString() || "0"}
              </p>

              {project.imageUrl && (
                <div
                  className="mt-4 rounded-md shadow border p-1"
                  style={{
                    borderRadius: "10px",
                    width: "100%",
                    height: "300px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-[8px] hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
              )}

              <div className="flex justify-self-stretch mt-4">
                <Link
                  href={`/projects/${project.slug.current}`}
                  className="text-sm px-6 py-2 rounded-md shadow border text-gray-800 hover:bg-gray-100 transition duration-300 w-full text-center"
                  style={{
                    borderRadius: "20px",
                  }}
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
