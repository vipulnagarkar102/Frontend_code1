import { ArrowDown, Box, BoxIcon, Component, HeartPulse, Settings } from 'lucide-react'
import React from 'react'
import Card from './OfferCard'

const Offers = () => {
  return (
    <div className='mt-30'>
        <div className='flex justify-center items-center'>
            <ArrowDown className="w-[32px] h-[32px] text-[#003F5C]" />
        </div>
        <p className='font-poppins mt-2 text-center relative text-[#003F5C] text-[40px] font-semibold'>What We Offers</p>

        {/* Offers Cards */}

        <div className="mx-8 my-12 flex flex-wrap gap-10 items-center justify-center">

            <Card
                    icon={HeartPulse}
                    heading="HealthTech AI Plan"
                    description="Explore AI-powered healthcare solutions—from diagnostics to precision therapies—enhancing efficiency, accuracy, and personalized care"
                    link="/"
                    bgFrom="#54b5ce"
                    bgTo="#c8d8db"
            />

            <Card
                    icon={Settings}
                    heading="Emerging Technology Plan"
                    description="Stay ahead with AI-driven solutions in emerging tech, security, and process optimization. Explore real-world use cases and hands-on applications to drive innovation and excellence"
                    link="/"
                    bgFrom="#FFB74D"
                    bgTo="#EFE7DC"
            />

            <Card
                    icon={BoxIcon}
                    heading="FlexPicks"
                    description="Vtex FlexPicks lets you buy individual Emerging Tech and HealthTech AI videos—no subscription needed. Get expert insights on demand!"
                    link="/"
                    bgFrom="#6FA5BE"
                    bgTo="#CEE2EC"
            />

            <Card
                    icon={Component}
                    heading="Enterprise Plan"
                    description="Accelerate workforce growth with a white-labeled platform for AI-driven learning in Emerging Tech and HealthTech."
                    link="/"
                    bgFrom="#00A897"
                    bgTo="#D8EDEA"
            />

        </div>

        
    </div>
  )
}

export default Offers