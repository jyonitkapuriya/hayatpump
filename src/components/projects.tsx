"use client";

import { ProjectCard } from "@/components";
import { Typography } from "@material-tailwind/react";
import Pupm1 from '../images/pums/pump1.jpg'
import Pupm2 from '../images/pums/home-pump.jpg'
import Pupm3 from '../images/pums/solar-pump.jpg'

const PROJECTS = [
  {
    img: Pupm1,
    title: "Pumps",
    desc: "Mobile app designed to help users discover and explore local restaurants and cuisines.",
  },
  {
    img: Pupm2,
    title: "Induction Motors",
    desc: "Promotional landing page for a  fitness website Summer Campaign. Form development included.",
  },
  {
    img: Pupm3,
    title: "Solar Solutions",
    desc: "Mobile app designed to help users discover and explore local restaurants and cuisines.",
  },

];

export function Projects() {
  return (
    <section className="py-28 px-8">
      <div className="container mx-auto mb-20 text-center">
        <Typography variant="h2" color="blue-gray" className="mb-4 lg:text-8xl text-5xl ">
          Product Range
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto w-full px-4 font-normal !text-gray-500 lg:w-6/12"
        >
          Whether you have a mobile app idea that needs to come to life or a
          website that requires a facelift, I&apos;m here to turn your digital
          dreams into reality.
        </Typography>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2 xl:grid-cols-3">
        {PROJECTS.map((props, idx) => (
          <div key={idx}>
            <ProjectCard key={idx} {...props} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
