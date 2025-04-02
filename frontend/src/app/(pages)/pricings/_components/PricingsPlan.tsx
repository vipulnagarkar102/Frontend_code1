import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowRight } from 'lucide-react'; 

interface PricingsPlanProps {
  title: string;
}

const PricingsPlan: React.FC<PricingsPlanProps> = ({ title }) => {
  return (
    <div className="w-[300px] h-[400px] rounded-[30px] text-[#003F5C] font-poppins font-semibold text-[32px] opacity-85 hover:opacity-100 flex flex-col justify-between p-8 gap-6 hover:scale-105 transition-transform duration-200 bg-[#FFFFFF] border border-[#00A5CF]/20 shadow-md">

      <div>
        <p className="pl-2 bg-gradient-to-r from-[#00A5CF]/30 via-[#00A5CF]/15 to-[#FFFFFF]/5"> 
            {title}
        </p>
      </div>
      <div>
        <p className="font-poppins text-[22px] font-semibold">
          $1/<span className='text-[18px] font-normal'>Month</span>
        </p>
      </div>
      <div>
      <Button className='font-lato py-4 font-semibold text-[16px] cursor-pointer bg-[#00A5CF] hover:bg-[#00A5CF] text-[#FFFFFF] leading-[100% '>START SUBSCRIPTION <span className='rotate-225'><ArrowDown size={30}/></span></Button>
      </div>
    </div>
  );
};

export default PricingsPlan;