import React from "react";

interface AiSolutionCardProps {
  highlightedText: string;
  mainText: string;
  subText: string;
}

const AiSolutionCard: React.FC<AiSolutionCardProps> = ({ highlightedText, mainText, subText }) => {
  return (
    <div className="bg-[#003F5C] w-[310px] h-[300px] rounded-r-xl font-semibold flex flex-col justify-center gap-4 p-6 text-white">
      <p className="font-poppins text-[32px]">
        <span className="text-[#FFB74D]">{highlightedText}</span><br />
        {mainText}
      </p>
      <p className="font-lato text-[24px]">{subText}</p>
    </div>
  );
};

export default AiSolutionCard;
