import React from "react";

interface AiSolutionCardProps {
  highlightedText: string;
  mainText: string;
  subText: string;
}

const AiSolutionCard: React.FC<AiSolutionCardProps> = ({ highlightedText, mainText, subText }) => {
  return (
    <div className="text-[#003F5C] mt-20 font-semibold text-center px-4">
      <p className="font-poppins text-[42px] leading-[100%] mb-4">
        <span className="text-[#FFB74D]">{highlightedText}</span>
        {mainText}
      </p>
      <p className="font-lato text-[24px]">{subText}</p>
    </div>
  );
};

export default AiSolutionCard;
