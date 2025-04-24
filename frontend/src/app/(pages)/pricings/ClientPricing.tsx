// app/pricing/ClientPricing.tsx
'use client';

import React, { useState, useEffect } from 'react';
import ToggleSwitch from './_components/ToggleSwitch';
import PricingsPlan from './_components/PricingsPlan';

type RawApiResponse = {
  success: boolean;
  data: Record<
    string,
    Array<{
      plan_type: string;
      price: number;
      currency: string;
    }>
  >;
};

export default function ClientPricing({
  initialAnnual,
  onToggle
}: {
  initialAnnual: boolean;
  onToggle: (v: boolean) => void;
}) {
  const [isAnnual, setIsAnnual] = useState(initialAnnual);
  const [plans, setPlans]       = useState<Array<{ title: string; price: number }>>([]);

  // Lift toggle state up
  const handleToggle = () => {
    setIsAnnual(v => {
      onToggle(!v);
      return !v;
    });
  };

  useEffect(() => {
    async function fetchPlans() {
      const priceType = isAnnual ? 'Annual' : 'Monthly';
      const res = await fetch(`https://paymentapi-7cpi.onrender.com/api/prices?priceType=${priceType}`);
      const json: RawApiResponse = await res.json();

      const flat = Object.values(json.data)
        .flat()
        .map(p => ({ title: p.plan_type, price: p.price }));

      setPlans(flat);
    }
    fetchPlans();
  }, [isAnnual]);

  return (
    <>
      {/* Toggle lives here so it re-renders on client */}
      <div className="flex justify-center items-center gap-4 my-6">
        <span className={`font-semibold ${!isAnnual ? 'text-[#003F5C]' : 'text-gray-400'}`}>Monthly</span>
        <ToggleSwitch checked={isAnnual} onChange={handleToggle} />
        <span className={`font-semibold ${isAnnual ? 'text-[#003F5C]' : 'text-gray-400'}`}>Annually</span>
      </div>

      <div className="mx-8 my-12 flex flex-wrap gap-10 items-center justify-center">
        {plans.map((plan, idx) => (
          <PricingsPlan
            key={idx}
            title={plan.title}
            price={plan.price}
            isAnnual={isAnnual}
          />
        ))}
      </div>
    </>
  );
}
