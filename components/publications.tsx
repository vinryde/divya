"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { getPublications } from "@/sanity/queries";
import type { Publication } from "@/sanity/types";
import { LiquidButton } from "@/components/liquid-glass-button";

export const PublicationGrid: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPublications();
      setPublications(data);
    };
    fetchData();
  }, []);

  return (
    <section className="py-10">
      <div className="mx-auto md:px-16 sm:px-4 space-y-12">
        <div>
            <div className="flex flex-col  mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold mb-2 text-center">Publications</h2>
          <p className="text-md   mb-6 text-center">
            Discover our curated collection of academic publications that reflect innovative research and impactful findings.
          </p>
          </div>

          {publications.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
              {publications.map((pub) => (
                <Card
                  key={pub._id}
                  variant="gradient"
                  title={pub.title}
                  description={pub.shortDescription}
                  className="max-w-[400px] bg-background"
                >
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" inline-block text-white text-sm font-medium"
                  >
                    <LiquidButton size={"sm"}>
                    View Publication
                    </LiquidButton>
                  </a>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No publications found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PublicationGrid;
