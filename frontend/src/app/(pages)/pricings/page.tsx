// app/pricing/page.tsx
'use client';
import React, { Suspense, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import PlanFeatures from './_components/PlanFeatures';
import FaqAccordion from './_components/FaqAccordian';
import Footer from '@/app/_components/Footer';
import ClientPricing from './ClientPricing';

export default function PricingPage() {
  // Lift state so server and client share initial toggle
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="mt-26 [@media(min-width:1750px)]:mt-36 font-lato text-[#003F5C]">
      {/* Header */}
      <div className="mt-10 m-4 text-center">
        <h1 className="font-extrabold text-[36px] md:text-[50px] [@media(min-width:1750px)]:text-[72px] mb-4">
          Flexible Plans, Instant Access – At<br />a Price You Love!
        </h1>
        <p className="font-normal text-[18px] [@media(min-width:1750px)]:text-[28px]">
          We offer flexible plans designed for instant access to cutting-edge solutions...
        </p>
      </div>

      {/* Free Plan (static) */}
      <div className="mx-8 my-12 flex flex-wrap gap-10 items-center justify-center">
        <div className="w-[280px] h-[400px] [@media(min-width:1750px)]:w-[380px] [@media(min-width:1750px)]:h-[480px]
                        rounded-[30px] bg-[#003F5C] text-white font-poppins font-semibold text-[32px]
                        [@media(min-width:1750px)]:text-[42px] flex flex-col justify-between p-8 gap-6
                        hover:scale-105 transition-transform duration-200 border border-[#00A5CF]/20 shadow-md">
          <div><p>Free Expert Videos</p></div>
          <div>
            <p className="font-poppins text-[22px] [@media(min-width:1750px)]:text-[30px] font-semibold">$0</p>
            <p className="font-lato text-[16px] [@media(min-width:1750px)]:text-[22px]">No credit card required</p>
          </div>
          <div>
            <Button className="w-full bg-[#00A5CF] hover:bg-[#00A5CF] text-white font-lato py-4 font-semibold">
              START FOR FREE <ArrowDown size={24} className="inline-block rotate-225" />
            </Button>
          </div>
        </div>

      </div>

      {/* Client-only portion in Suspense */}
      <Suspense fallback={<div className="text-center py-12">Loading plans…</div>}>
        <ClientPricing initialAnnual={isAnnual} onToggle={setIsAnnual} />
      </Suspense>

      {/* Rest of the page */}
      <PlanFeatures />
      <FaqAccordion />
      <Footer />
    </div>
  );
}
