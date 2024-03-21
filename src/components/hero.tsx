"use client";

import Image from "next/image";
import { Input, Button, Typography } from "@material-tailwind/react";
import Owner from "../images/owner.svg"
function Hero() {
  return (
    <header className="bg-white p-8">
      <div className="container mx-auto grid h-full gap-10 min-h-[60vh] w-full grid-cols-1 items-center lg:grid-cols-2">
        <div className="row-start-2 lg:row-auto">
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-4 lg:text-5xl !leading-tight text-3xl"
          >
            Setting a tradition of excellence since 1981.

          </Typography>
          <Typography
            variant="lead"
            className="mb-4 !text-gray-500 md:pr-16 xl:pr-28"
          >
            Hayat Pumps & Motors has established itself as a distinguished manufacturer of {" "}<span className="font-bold text-gray-900">
              Premium quality, efficient, reliable and long-lasting pumps and motors
            </span>{" "}
            for more than
            <span className="font-bold text-gray-900">
              {" "} 40 years.
            </span>
          </Typography>
        </div>
        <Image
          width={400}
          height={400}
          alt="team work"
          src={Owner}
          className=" mx-auto rounded-xl object-cover"
        />
      </div>
    </header>
  );
}

export default Hero;
