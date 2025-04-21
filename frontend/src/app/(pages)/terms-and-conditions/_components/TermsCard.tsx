import React from "react";
import { ChevronRight, FileText } from "lucide-react";
import * as Icons from "lucide-react";

type IconName = keyof typeof Icons;

interface TermsCardProps {
  title: string;
  icon: string;
}

const TermsCard: React.FC<TermsCardProps> = ({ title, icon }) => {
  const IconComponent = (Icons[icon as IconName] || FileText) as React.FC<{
    size: number;
    color: string;
  }>;

  return (
    <div className="rounded-[30px] bg-white text-[#003F5C] shadow-sm px-6 py-4 flex flex-col gap-6 [@media(min-width:1750px)]:gap-10 justify-between hover:scale-105 duration-200 h-[240px] w-[220px] [@media(min-width:1750px)]:w-[300px] cursor-pointer">
        {/* Icon container */}
        <div className="rounded-full h-11 w-11 bg-[#00A5CF] flex items-center justify-center text-white">
          <IconComponent size={20} color="white" />
        </div>

        {/* Title */}
        <p className="font-semibold font-poppins text-[18px] [@media(min-width:1750px)]:text-[22px]">{title}</p>

      {/* Arrow */}
      <div className="pl-[140px] [@media(min-width:1750px)]:pl-[200px]">
        <Icons.ArrowRight size={22} />
      </div>
    </div>
  );
};

export default TermsCard;
