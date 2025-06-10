import React from "react";
import Container from "./Container";
import { Title } from "./typo";
import { Box, Dice5, LoaderPinwheel, Sparkle, Lightbulb,GraduationCap} from "lucide-react";

const data = [
  {
    icon: <Lightbulb size={50} />,
    title: "Innovative Pedagogy",
    description:
      "Designs and implements tech-integrated, experiential learning strategies that transform classrooms into dynamic, inclusive spaces for deep understanding and critical thinking.",
  },
  {
    icon: <GraduationCap size={50} />,
    title: "Mentorship",
    description:
      "Mentors educators and research scholars, builds professional communities, and contributes to teacher education policy through national and institutional committees.",
  },
  {
    icon: <LoaderPinwheel size={50} />,
    title: "Energy Literacy",
    description:
      "Promotes climate-conscious citizenship through curriculum design, community workshops, and global research on sustainable development goals.",
  },
  {
    icon: <Box size={50} />,
    title: "Policy Influence",
    description:
      "Advises on national teacher standards and digital education guidelines through leadership in government and university committees.",
  },
];

const WhatIDo = () => {
  return (
    <div className="bg-darkColor text-primaryWhite py-20 md:py-24">
      <Container className="space-y-10">
        <div>
          <Title className="tracking-widest">What I Do</Title>
          <p className="tracking-wide max-w-2xl mt-2 text-primaryWhite/80">
          Advancing education through research-driven innovation, inclusive pedagogy, and sustainable development — building impactful learning ecosystems across disciplines and borders.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {data?.map((item) => (
            <div key={item?.title} className="space-y-4 group">
              <span className="group-hover:text-darkOrange hoverEffect group-hover:animate-spin inline-block">
                {item?.icon}
              </span>
              <h3 className="text-2xl font-semibold">{item?.title}</h3>
              <p className="tracking-wide text-primaryWhite/80 group-hover:text-primaryWhite/90 hoverEffect">
                {item?.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default WhatIDo;
