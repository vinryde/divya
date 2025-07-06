// app/projects/[slug]/page.tsx
import { getProjectDescBySlug } from "@/sanity/queries";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { BadgeCheck, CalendarDays, FolderKanban, CheckCircle } from "lucide-react";

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectDescBySlug(params.slug);

  if (!project) return notFound();

  return (
    <section className="max-w-3xl mx-auto py-16 px-4 space-y-6">
      <h1 className="text-3xl font-bold">{project.title}</h1>

      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full max-w-2xl rounded-md border border-gray-200"
        />
      )}

      <div className="grid grid-cols-1 gap-2 text-sm text-gray-700 mt-4">
        {project.sanctionedBudget && (
          <p className="flex items-center gap-2">
            <FolderKanban className="w-4 h-4 text-darkOrange" />
            <span className="font-semibold">Sanctioned Budget:</span>{" "}
            ₹{project.sanctionedBudget.toLocaleString()}
          </p>
        )}
        {project.fundedBy && (
          <p className="flex items-center gap-2">
            <BadgeCheck className="w-4 h-4 text-darkOrange" />
            <span className="font-semibold">Funded By:</span> {project.fundedBy}
          </p>
        )}
        {project.yearsActive && (
          <p className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-darkOrange" />
            <span className="font-semibold">Years Active:</span> {project.yearsActive}
          </p>
        )}
        {project.status && (
          <p className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-darkOrange" />
            <span className="font-semibold">Status:</span>{" "}
            {project.status === "running" ? "Running" : "Closed"}
          </p>
        )}
      </div>

      <div className="mt-6 prose max-w-none text-gray-800">
        <PortableText value={project.description} />
      </div>
    </section>
  );
}
