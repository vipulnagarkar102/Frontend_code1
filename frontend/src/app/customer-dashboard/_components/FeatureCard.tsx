import React, { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  className = '' 
}) => {
  return (
    <div className={`rounded-[30px] flex flex-col justify-between p-6 md:p-8 gap-6 hover:scale-105 duration-200 bg-[#FFFFFF] min-h-[260px] w-[360px] [@media(min-width:1750px)]:w-[460px] mx-2 shadow-sm ${className}`}>
      {/* Icon Container */}
      <div className="rounded-full h-11 w-11 bg-[#00A5CF] flex items-center justify-center">
        {icon}
      </div>
      
      {/* Heading */}
      <div>
        <p className="font-poppins text-[20px] md:text-[22px] [@media(min-width:1750px)]:text-[28px] font-semibold text-[#003F5C]">
          {title}
        </p>
      </div>
      
      {/* Description */}
      <div>
        <p className="font-lato font-medium leading-[24px] text-[16px] md:text-[18px] [@media(min-width:1750px)]:text-[22px]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;