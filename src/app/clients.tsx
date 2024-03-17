"use client";

import Image from "next/image";
import { Typography } from "@material-tailwind/react";
import { Expertise } from '../components/ExpertisedData/Expertise'
// const CLIENTS = [
//   "coinbase",
//   "spotify",
//   "pinterest",
//   "google",
//   "amazon",
//   "netflix",
// ];

export function Clients() {
  return (
    <section className="px-8 py-28">
      <div className="container mx-auto text-center">
        <p className="mb-4 lg:text-8xl text-5xl ">
          Expertise
        </p>
        <p
          className="mb-6 text-gray-600 text-lg md:pr-16   xl:pr-28"
        >
          We are into the manufacturing of all types of water pumps and consumer electrical products.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-20 gap-y-10">
          {Expertise.map((item, key) => (
            <div className="flex flex-col gap-4 items-center justify-center" key={key}>
              <Image
                key={key}
                alt={item.name}
                width={768}
                height={768}
                className="w-28"
                src={item.icon}
              />
              <div className=" antialiased tracking-normal font-sans  font-semibold leading-snug text-blue-gray-900 mb-2 mt-3 w-[120px] flex justify-center flex-wrap ">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Clients;
