import { hero } from "@/assets/image";
import Container from "@/components/Container";
import { LiquidButton } from "@/components/liquid-glass-button";
import { Typewriter } from "@/components/ui/typewriter";
import Image from "next/image";
import React from "react";

const AboutPage = () => {
  return (
    <Container className="bg-white text-darkColor py-10 md:py-20">
      <div>
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image
              className="h-48 object-contain md:w-48"
              src={hero}
              alt="Profile picture"
              width={192}
              height={192}
            />
          </div>
          <div className="p-8">
          
            <h1 className="mt-6 text-3xl leading-8 font-extrabold tracking-tight text-darkColor sm:text-3xl">
              Divya C. Senan Ph.D.
            </h1>
            <p className="mt-4 max-w-lg text-lg text-darkColor/80">
            <Typewriter
          text={[
            "Associate Professor, Department of Education, University of Kerala",
            "Hon. Director, Centre for Learning Engineering and Sustainability Education, University of Kerala",
          ]}
          speed={40}
          className="text-darkOrange max-w-xl"
          waitTime={1500}
          deleteSpeed={30}
          cursorChar={"_"}
        />
            </p>
          </div>
        </div>

        <div className="px-8 py-6">
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <p className="text-darkColor/80 mb-4">
            Dr. Divya C. Senan serves as Associate Professor in the Department of Education and Honorary Director of the Centre
            for Learning Engineering & Sustainability Education at the University of Kerala. She also served as a Visiting Professor
            at the University of Southampton, UK. With a PhD in Education and postdoctoral research experiences in Educational
            Policy Planning and Environmental Education from the NSSTC, University of Alabama in Huntsville USA, she brings
            over 18 years of academic and research expertise.
          </p>
          <p className="text-darkColor/80 mb-2">
            Dr. Senan is a Fulbright-Nehru and UGC-Raman Postdoctoral Fellow
            and recipient of multiple national honours, including the Best Teacher Educator Award (NCTE, MHRD) and the
            Chanakya Award (IITE). Her core research interests centre on educational technology integration, energy education,
            and inclusive, sustainability-focused pedagogical innovations. Her work is informed by interdisciplinary collaboration
            and cross-cultural educational frameworks.
          </p>
        </div>

        

        {/* Download buttons */}
        <div className="flex flex-wrap gap-4 px-8 py-2">
          <a
            href="/Resume.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <LiquidButton size={"sm"}>Download Resume</LiquidButton>
          </a>

          <a
            href="/CV.docx"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <LiquidButton size={"sm"}>Download CV</LiquidButton>
          </a>
        </div>
      </div>
    </Container>
  );
};

export default AboutPage;
