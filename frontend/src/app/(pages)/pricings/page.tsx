import { Button } from '@/components/ui/button'
import { ArrowDown, Check, HeartPulse } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import PricingsPlan from './_components/PricingsPlan'
import PlanFeatures from './_components/PlanFeatures'
import FaqAccordion from './_components/FaqAccordian'
import Footer from '@/app/_components/Footer'

const Pricings = () => {
  return (
    <div className='mt-26 font-lato text-[#003F5C]'>
      <div className='mt-10 m-4 text-center'>
        <p className='font-extrabold text-[36px] md:text-[50px] mb-4 '>Flexible Plans, Instant Access – At<br/> a Price You Love!</p>
        <p className='font-normal text-[18px] md:text-[18px]'>We offer flexible plans designed for instant access to cutting-edge solutions. Explore the latest innovations with our Emerging Tech and HealthTech AI plans, or choose FlexPicks to unlock individual solutions on demand. For businesses, our Enterprise Plan provides seamless integration of digital assets into your workflow. With new solutions published regularly, you’ll always stay ahead of industry trends. Unlock Knowledge, Innovate Faster – Your Way!</p>
      </div>

      <div className="mx-8 my-12 flex flex-wrap gap-10 items-center justify-center">
        <div className="w-[300px] h-[400px] rounded-[30px] text-white font-poppins font-semibold text-[32px] bg-[#003F5C] flex flex-col justify-between p-8 gap-6 hover:scale-105 transition-transform duration-200 border border-[#00A5CF]/20 shadow-md">
        
              <div>
                <p className=""> 
                Free Expert Videos
                </p>
              </div>
              <div>
                <p className="font-poppins text-[22px] font-semibold">
                  $0
                </p>
                <p className='font-lato text-[16px] text-white font-normal'>No credit card required</p>
              </div>
              <div>
              <Button className='font-lato py-4 font-semibold text-[16px] cursor-pointer bg-[#00A5CF] hover:bg-[#00A5CF] text-[#FFFFFF] leading-[100% '>START FOR FREE <span className='rotate-225'><ArrowDown size={30}/></span></Button>
              </div>
            </div>
            <PricingsPlan title="Emerging Tech" />
            <PricingsPlan title="HealthTech AI" />
            <PricingsPlan title="FlexPicks" />
      </div>

      

      <p className='mt-20 font-poppins font-normal text-[16px] px-12 md:px-42 text-center'>The prices listed above do not incorporate the taxes applicable based on your billing location. The total amount payable will be shown on the checkout page prior to finalizing your payment.</p>
      
      <div className='mx-4'>
        <p className='font-poppins font-semibold text-[40px] mt-10 text-center p-4x'>Compare All Plan Features</p>
        <PlanFeatures/>
      </div>


      {/* Enterprise Plan */}

      <div className='mx-4'>
        <div className="border-2 border-dashed border-gray-400 rounded-xl p-6 bg-[#E0F7FA] text-[#003F5C] max-w-[1360px] my-18 mx-auto flex flex-col">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h2 className="text-[40px] font-poppins font-semibold mb-3">Enterprise Plan</h2>
            </div>
            <div>
              <Button className='font-lato py-4 font-semibold text-[16px] cursor-pointer bg-[#00A5CF] hover:bg-[#00A5CF] text-[#FFFFFF] leading-[100%]'>CONTACT US<span className='rotate-225'><ArrowDown size={30}/></span></Button>
            </div>
          </div>

          <div className='flex flex-col md:flex-row gap-10 md:gap-16 mt-12'>
            <div className='md:w-1/2'>
              <p className="mb-6 font-lato text-[20px] font-normal">
              Designed for high-growth businesses and teams, our Enterprise Plan offers custom pricing, enterprise-grade features, advanced integrations, and dedicated support to help you scale seamlessly. Whether you’re expanding your online education platform or integrating digital assets into your ecosystem, Vtex.ai provides the flexibility and tools you need. Schedule a call with our team to explore how we can tailor a solution that accelerates your success. 
              Let’s innovate and grow—together!
              </p>
            </div>
            <div className="md:w-1/2 space-y-4 font-lato font-normal text-[18px]">
              <div className="flex items-center">
                <Check className="h-8 w-8 text-white p-2 rounded-full bg-[#00A897] mr-3" />
                <span className="">White labeling solution</span>
              </div>
              <div className="flex items-center">
                <Check className="h-8 w-8 text-white p-2 rounded-full bg-[#00A897] mr-3" />
                <span className="">Team onboarding training</span>
              </div>
              <div className="flex items-center">
                <Check className="h-8 w-8 text-white p-2 rounded-full bg-[#00A897] mr-3" />
                <span className="">Custom pricing</span>
              </div>
              <div className="flex items-center">
                <Check className="h-8 w-8 text-white p-2 rounded-full bg-[#00A897] mr-3" />
                <span className="">Dedicated success manager</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      


        {/* Faqs */}

        <FaqAccordion/>

        {/* footer */}

        <Footer/>
      </div>
  )
}

export default Pricings