import Link from "next/link";
import { LucideIcon, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CardProps {
  icon: LucideIcon;
  heading: string;
  description: string;
  link: string;
  bgFrom: string;
  bgTo: string;
}

const Card: React.FC<CardProps> = ({ icon: Icon, heading, description, link, bgFrom, bgTo }) => {
  return (
    <div
      className="w-[307px] h-[475px] rounded-[30px] opacity-75 flex flex-col justify-between p-8 gap-6"
      style={{
        background: `linear-gradient(to bottom, ${bgFrom}, ${bgTo})`,
      }}
    >
      {/* Icon Container */}
      <div className="rounded-full h-11 w-11 bg-white flex items-center justify-center">
        <Icon size={30} color={`${bgFrom}`} />
      </div>

      {/* Heading */}
      <div>
        <p className="font-poppins text-[22px] font-semibold text-[#073e4b]">
          {heading}
        </p>
      </div>

      {/* Description */}
      <div>
        <p className="font-lato text-[18px] text-[#232323]">{description}</p>
      </div>

      {/* Button */}
      <div>
        <Link href={link}>
            <Button variant='secondary' className='font-lato font-semibold text-[16px] cursor-pointer'>EXPLORE PLAN <span className='rotate-225'><ArrowDown size={30}/></span></Button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
