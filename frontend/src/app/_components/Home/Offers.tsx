import { ArrowDown, Box, BoxIcon, Component, HeartPulse, Settings } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Offers = () => {
  return (
    <div className='mt-30'>
        <div className='flex justify-center items-center'>
            <ArrowDown className="w-[32px] h-[32px] text-[#003F5C]" />
        </div>
        <p className='font-poppins mt-2 text-center relative text-[#003F5C] text-[40px] font-semibold'>What We Offers</p>

        {/* Offers Cards */}

        <div className="mx-8 my-12 flex flex-wrap gap-10 items-center justify-center text-[#003F5C]">


                <div className="w-[290px] h-[475px] rounded-[30px] opacity-75 flex flex-col justify-between p-8 gap-6 hover:scale-105 duration-200 bg-gradient-to-b from-[#00A5CF]/30 via-[#00A5CF]/15 to-[#00A5CF]/5">
                        {/* Icon Container */}
                        <div className="rounded-full h-11 w-11 bg-white flex items-center justify-center">
                                <HeartPulse size={30} color='#00A5CF'/>
                        </div>

                        {/* Heading */}
                        <div>
                                <p className="font-poppins text-[22px] font-semibold text-[#00A5CF]"
                                >
                                HealthTech AI Plan
                                </p>
                        </div>

                        {/* Description */}
                        <div>
                                <p className="font-lato font-medium leading-[24px] text-[18px]">Explore AI-powered healthcare solutions—from diagnostics to precision therapies—enhancing efficiency, accuracy, and personalized care</p>
                        </div>

                        {/* Button */}
                                <div>
                                        <Link href='/'>
                                        <Button variant='secondary' className='font-lato font-semibold text-[16px] cursor-pointer bg-[#FFFFFF] text-[#003F5C] leading-[100%]'>EXPLORE PLAN <span className='rotate-225'><ArrowDown size={30}/></span></Button>
                                        </Link>
                                </div>
                </div>

                <div className="w-[290px] h-[475px] rounded-[30px] opacity-75 flex flex-col justify-between p-8 gap-6 hover:scale-105 duration-200 bg-gradient-to-b from-[#1FD2FF]/30 via-[#1FD2FF]/15 to-[#1FD2FF]/5">
                        {/* Icon Container */}
                        <div className="rounded-full h-11 w-11 bg-white flex items-center justify-center">
                                <Settings size={30} color='#1FD2FF'/>
                        </div>

                        {/* Heading */}
                        <div>
                                <p className="font-poppins text-[22px] font-semibold text-[#1FD2FF]"
                                >
                                Emerging Technology Plan
                                </p>
                        </div>

                        {/* Description */}
                        <div>
                                <p className="font-lato font-medium leading-[24px] text-[18px]">Stay ahead with AI-driven solutions in emerging tech, security, and process optimization. Explore real-world use cases and hands-on applications to drive innovation and excellence</p>
                        </div>

                        {/* Button */}
                                <div>
                                        <Link href='/'>
                                        <Button variant='secondary' className='font-lato font-semibold text-[16px] cursor-pointer bg-[#FFFFFF] text-[#003F5C] leading-[100%]'>EXPLORE PLAN <span className='rotate-225'><ArrowDown size={30}/></span></Button>
                                        </Link>
                                </div>
                </div>

                <div className="w-[290px] h-[475px] rounded-[30px] opacity-75 flex flex-col justify-between p-8 gap-6 hover:scale-105 duration-200 bg-gradient-to-b from-[#0093B8]/30 via-[#0093B8]/15 to-[#0093B8]/5">
                        {/* Icon Container */}
                        <div className="rounded-full h-11 w-11 bg-white flex items-center justify-center">
                                <BoxIcon size={30} color='#0093B8'/>
                        </div>

                        {/* Heading */}
                        <div>
                                <p className="font-poppins text-[22px] font-semibold text-[#0093B8]"
                                >
                                FlexPicks
                                </p>
                        </div>

                        {/* Description */}
                        <div>
                                <p className="font-lato font-medium leading-[24px] text-[18px]">Vtex FlexPicks lets you buy individual Emerging Tech and HealthTech AI videos—no subscription needed. Get expert insights on demand!</p>
                        </div>

                        {/* Button */}
                                <div>
                                        <Link href='/'>
                                        <Button variant='secondary' className='font-lato font-semibold text-[16px] cursor-pointer bg-[#FFFFFF] text-[#003F5C] leading-[100%]'>EXPLORE PLAN <span className='rotate-225'><ArrowDown size={30}/></span></Button>
                                        </Link>
                                </div>
                </div>

                <div className="w-[290px] h-[475px] rounded-[30px] opacity-75 flex flex-col justify-between p-8 gap-6 hover:scale-105 duration-200 bg-gradient-to-b from-[#70E2FF]/30 via-[#70E2FF]/15 to-[#70E2FF]/5">
                        {/* Icon Container */}
                        <div className="rounded-full h-11 w-11 bg-white flex items-center justify-center">
                                <Component size={30} color='#70E2FF'/>
                        </div>

                        {/* Heading */}
                        <div>
                                <p className="font-poppins text-[22px] font-semibold text-[#70E2FF]"
                                >
                                Enterprise Plan
                                </p>
                        </div>

                        {/* Description */}
                        <div>
                                <p className="font-lato font-medium leading-[24px] text-[18px]">Accelerate workforce growth with a white-labeled platform for AI-driven learning in Emerging Tech and HealthTech.</p>
                        </div>

                        {/* Button */}
                                <div>
                                        <Link href='/'>
                                        <Button variant='secondary' className='font-lato font-semibold text-[16px] cursor-pointer bg-[#FFFFFF] text-[#003F5C] leading-[100%]'>EXPLORE PLAN <span className='rotate-225'><ArrowDown size={30}/></span></Button>
                                        </Link>
                                </div>
                </div>
        </div>

        
    </div>
  )
}

export default Offers