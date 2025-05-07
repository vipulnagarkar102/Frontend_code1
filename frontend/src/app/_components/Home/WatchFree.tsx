"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import React from "react";

const WatchFree = () => {
  return (
    <div className="relative [@media(min-width:1750px)]:mt-20">
      {/* for small screen */}
      <div className="bg-[#00A5CF] xl:hidden">
        <p className="font-poppins text-[32px] text-center font-semibold text-white">
          START FOR FREE
        </p>
      </div>

      {/* for large screen */}
      <p className="hidden absolute xl:block -ml-44  mt-[138px] [@media(min-width:1750px)]:mt-[180px] font-poppins text-[32px] text-center font-semibold text-white pt-12 pb-6 bg-[#00A5CF] transform -rotate-90 w-[400px] [@media(min-width:1750px)]:w-[480px]">
        START FOR FREE
      </p>

      <div className="xl:h-[400px] [@media(min-width:1750px)]:h-[480px] bg-[#E0F7FA] max-w-screen flex flex-row">
        <div className="md:pl-12 max-w-screen flex gap-6 [@media(min-width:1750px)]:gap-30 my-6 xl:my-0 flex-wrap mx-auto items-center justify-center text-[#003F5C]">
          <div
            className="flex flex-col justify-between gap-4 mx-4 px-6 py-12  rounded-[10px]  lg:w-[540px] lg:h-[334px] [@media(min-width:1750px)]:w-[600px] [@media(min-width:1750px)]:h-[400px] bg-cover bg-center cursor-pointer"
            style={{ backgroundImage: "url('/Generative AI for DevOps.png')" }}
          >
            <p className="font-lato text-[22px] text-white bg-[#00A897] bg-opacity-80 px-4 py-2 rounded-md inline-block w-fit">
              Predicting Fibrosis Stages in NAFLD <br /> Using Advanced AI
              Models
            </p>
            {/* <p className="font-poppins text-[40px] text-white">HealthTech AI Plan</p> */}

            <Link
              href="https://iframe.dacast.com/vod/9900da50-f739-dfb2-d77e-a292aac8b47f/d28e41cb-3e2d-48c7-b6b2-1c02b7368324"
              target="_blank"
            >
              <Button
                variant="secondary"
                className="bg-[#00A5CF] text-white hover:scale-105 duration-150 hover:bg-[#00A5CF] font-lato font-semibold text-[16px] [@media(min-width:1750px)]:text-[20px] cursor-pointer"
                onClick={(e) => e.stopPropagation()} // Prevents parent click from firing
              >
                WATCH NOW
                <span className="rotate-225 ml-2">
                  <ArrowDown size={30} />
                </span>
              </Button>
            </Link>
          </div>

          <div
            className="flex flex-col justify-between gap-4 mx-4 px-6 py-12  rounded-[10px]  lg:w-[540px] lg:h-[334px] [@media(min-width:1750px)]:w-[600px] [@media(min-width:1750px)]:h-[400px] bg-cover bg-center cursor-pointer"
            style={{ backgroundImage: "url('/Fibrosis predictions.png')" }}
          >
            <p className="font-lato text-[22px] text-white bg-[#00A897] bg-opacity-80 px-4 py-2 rounded-md inline-block w-fit">
              Revolutionizing DevSecOps: AI and <br /> Generative AI in Action
              Models
            </p>
            {/* <p className="font-poppins text-[40px] text-white">HealthTech AI Plan</p> */}

            <Link
              href="https://iframe.dacast.com/vod/9900da50-f739-dfb2-d77e-a292aac8b47f/22e74208-fa8c-44dc-b5d1-540ffbc68c5b"
              target="_blank"
            >
              <Button
                variant="secondary"
                className="bg-[#00A5CF] text-white hover:scale-105 duration-150 hover:bg-[#00A5CF] font-lato font-semibold text-[16px] [@media(min-width:1750px)]:text-[20px] cursor-pointer"
                onClick={(e) => e.stopPropagation()} // Prevents parent click from firing
              >
                WATCH NOW
                <span className="rotate-225 ml-2">
                  <ArrowDown size={30} />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchFree;
