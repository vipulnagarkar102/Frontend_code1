'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Check } from 'lucide-react';
import PricingsPlan from './_components/PricingsPlan';
import PlanFeatures from './_components/PlanFeatures';
import FaqAccordion from './_components/FaqAccordian';
import Footer from '@/app/_components/Footer';
import ToggleSwitch from './_components/ToggleSwitch';

const Pricings = () => {
  const [isAnnual, setIsAnnual] = useState(false); // Toggle state

  const handleToggle = () => {
    setIsAnnual(prev => !prev);
  };

  return (
    <div className='mt-26 [@media(min-width:1750px)]:mt-36 font-lato text-[#003F5C]'>
      <div className='mt-10 m-4 text-center'>
        <p className='font-extrabold text-[36px] md:text-[50px] [@media(min-width:1750px)]:text-[72px] mb-4'>
          Flexible Plans, Instant Access – At<br /> a Price You Love!
        </p>
        <p className='font-normal text-[18px] [@media(min-width:1750px)]:text-[28px]'>
          We offer flexible plans designed for instant access to cutting-edge solutions...
        </p>
      </div>

      {/* Toggle Button */}
      <div className="flex justify-center items-center gap-4 my-6">
        <span className={`font-semibold ${!isAnnual ? 'text-[#003F5C]' : 'text-gray-400'}`}>Monthly</span>
        <ToggleSwitch checked={isAnnual} onChange={handleToggle} />
        <span className={`font-semibold ${isAnnual ? 'text-[#003F5C]' : 'text-gray-400'}`}>Annually</span>
      </div>

      {/* Pricing Cards */}
      <div className="mx-8 my-12 flex flex-wrap gap-10 items-center justify-center">
        <div
          className="w-[280px] h-[400px] [@media(min-width:1750px)]:w-[380px] [@media(min-width:1750px)]:h-[480px] rounded-[30px] text-white font-poppins font-semibold text-[32px] [@media(min-width:1750px)]:text-[42px] bg-[#003F5C] flex flex-col justify-between p-8 gap-6 hover:scale-105 transition-transform duration-200 border border-[#00A5CF]/20 shadow-md">

          <div>
            <p className="">
              Free Expert Videos
            </p>
          </div>
          <div>
            <p className="font-poppins text-[22px] [@media(min-width:1750px)]:text-[30px] font-semibold">
              $0
            </p>
            <p className='font-lato text-[16px] [@media(min-width:1750px)]:text-[22px] text-white font-normal'>No credit
              card required</p>
          </div>
          <div>
            <Button
              className='font-lato py-4 font-semibold text-[16px] [@media(min-width:1750px)]:text-[22px] cursor-pointer bg-[#00A5CF] hover:bg-[#00A5CF] text-[#FFFFFF] leading-[100% '>START
              FOR FREE <span className='rotate-225'>
                <ArrowDown size={30} />
              </span></Button>
          </div>
        </div>
        <PricingsPlan title="Emerging Tech" isAnnual={isAnnual} />
        <PricingsPlan title="HealthTech AI" isAnnual={isAnnual} />
        <PricingsPlan title="FlexPicks" isAnnual={isAnnual} />
      </div>

      {/* Other sections remain unchanged */}
      <PlanFeatures />
      <FaqAccordion />
      <Footer />
    </div>
  );
};

export default Pricings;
