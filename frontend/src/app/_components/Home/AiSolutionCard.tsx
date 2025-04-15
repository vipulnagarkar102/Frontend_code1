import React from "react";

interface AiSolutionCardProps {
  highlightedText: string;
  mainText: string;
  subText: string;
}

const AiSolutionCard: React.FC<AiSolutionCardProps> = ({ highlightedText, mainText, subText }) => {
  return (
    <div className="text-[#003F5C] mt-20 font-semibold text-center px-4">
      <p className="font-poppins text-[42px] [@media(min-width:1750px)]:text-[50px] leading-[100%] mb-4">
        <span className="text-[#FFB74D]">{highlightedText}</span>
        {mainText}
      </p>
      <p className="font-lato text-[24px] [@media(min-width:1750px)]:text-[32px]">{subText}</p>
    </div>
  );
};

export default AiSolutionCard;
