import Image from 'next/image'
import React from 'react'
import HeroImage from '@/assets/contactus.png'
import { PlugIcon, ThumbsUp, SquareUserRound, CircleHelp, MapPin } from 'lucide-react'
import { GiOpenBook } from 'react-icons/gi'
import { BsPeople } from 'react-icons/bs'
import Footer from '@/app/_components/Footer'
import { Button } from '@/components/ui/button'
import { ArrowDown, Check, HeartPulse } from 'lucide-react'
import FaqAccordion from '../../(pages)/contact-us/components/FaqAccordian';

const ContactUs = () => {
    return (
        <div className='text-[#003F5C]'>
            <div className='flex flex-col md:flex-row gap-9 mt-36 md:mt-26 h-fit items-center justify-center px-4 md:px-12 lg:px-16 xl:px-24 2xl:px-28 p-4 bg-[#003F5C]/10'>

                {/* left div */}
                <div className='md:w-[55%] mt-22 pb-20'>
                    <p className='font-lato font-extrabold text-[36px] md:text-[50px] leading-[55px] tracking-[1%] mb-5'>Get In Touch</p>
                    <p className='font-lato font-medium text-[22px] leading-[120%] tracking-[0%]'>We're here to help! Whether you have questions about our services, need technical support, or want to share feedback, our team is ready to assist you. Please reach out to us through the communication channels listed below—we'll get back to you as soon as possible.</p>
                </div>

                {/* right div */}
                <div className='md:w-[45%] mt-22 pb-20'>
                    <Image
                        src={HeroImage}
                        alt='Hero Image'
                        // layout='fill' // Use layout='fill' to make the image cover the entire div
                        objectFit='cover' // Important for responsiveness
                        height={436}
                        width={693}
                    />
                </div>
            </div>

            {/* Our values */}

            <div className='bg-[#FFFFFF] py-15 px-15'>
                <p className='font-poppins font-bold text-[40px] leading-[100%] tracking-[0%] text-center'>FAQ’s</p>
                <FaqAccordion />
            </div>

            {/* Connect with us */}

            <div className='bg-[#E0F7FA] py-15 px-20'>
                <p className='font-poppins font-bold text-[40px] leading-[100%] tracking-[0%] text-center'>Connect With Us</p>

                <div className='mt-12 px-12 gap-8 grid grid-cols-1 lg:grid-cols-4 items-center justify-between'>
                    <div className='rounded-[10px] flex flex-col justify-between p-8 gap-6 hover:scale-105 duration-200 bg-[#FFFFFF] min-h-[260px]'>
                        {/* Icon Container */}
                        <div className="rounded-full h-11 w-11 bg-[#00A5CF] flex items-center justify-center">
                            <ThumbsUp size={24} color='white' />
                        </div>

                        {/* Heading */}
                        <div>
                            <p className="font-poppins text-[22px] font-semibold"
                            >
                                Emerging Tech Plan
                            </p>
                        </div>

                        {/* Description */}
                        <div>
                            <p className="font-lato font-medium leading-[24px] text-[18px]">Need a helping hand? Our team is just a click away! We're here to make your experience smooth and enjoyable. </p>
                            <Button className='mt-5 font-lato py-4 font-semibold text-[12px] cursor-pointer bg-[#00A5CF] hover:bg-[#00A5CF] text-[#FFFFFF] leading-[100% '>CONTACT FOR SUPPORT <span className='rotate-225'><ArrowDown size={30} /></span></Button>
                        </div>

                    </div>

                    <div className='rounded-[10px] flex flex-col justify-between p-8 gap-6 hover:scale-105 duration-200 bg-[#FFFFFF] min-h-[260px]'>
                        {/* Icon Container */}
                        <div className="rounded-full h-11 w-11 bg-[#00A5CF] flex items-center justify-center">
                            <SquareUserRound size={24} color='white' />
                        </div>

                        {/* Heading */}
                        <div>
                            <p className="font-poppins text-[22px] font-semibold"
                            >
                                HealthTech AI Plan
                            </p>
                        </div>

                        {/* Description */}
                        <div>
                            <p className="font-lato font-medium leading-[24px] text-[18px]">Need a helping hand? Our team is just a click away! We're here to make your experience smooth and enjoyable. </p>
                            <Button className='mt-5 font-lato py-4 font-semibold text-[12px] cursor-pointer bg-[#00A5CF] hover:bg-[#00A5CF] text-[#FFFFFF] leading-[100% '>CONTACT FOR SUPPORT <span className='rotate-225'><ArrowDown size={30} /></span></Button>
                        </div>

                    </div>
                    <div className='rounded-[10px] flex flex-col justify-between p-8 gap-6 hover:scale-105 duration-200 bg-[#FFFFFF] min-h-[260px]'>
                        {/* Icon Container */}
                        <div className="rounded-full h-11 w-11 bg-[#00A5CF] flex items-center justify-center">
                            <SquareUserRound size={24} color='white' />
                        </div>

                        {/* Heading */}
                        <div>
                            <p className="font-poppins text-[22px] font-semibold"
                            >
                                FlexPick<br></br> Plan
                            </p>
                        </div>

                        {/* Description */}
                        <div>
                            <p className="font-lato font-medium leading-[24px] text-[18px]">Need a helping hand? Our team is just a click away! We're here to make your experience smooth and enjoyable. </p>
                            <Button className='mt-5 font-lato py-4 font-semibold text-[12px] cursor-pointer bg-[#00A5CF] hover:bg-[#00A5CF] text-[#FFFFFF] leading-[100% '>CONTACT FOR SUPPORT <span className='rotate-225'><ArrowDown size={30} /></span></Button>
                        </div>

                    </div>
                    <div className='rounded-[10px] flex flex-col justify-between p-8 gap-6 hover:scale-105 duration-200 bg-[#FFFFFF] min-h-[260px]'>
                        {/* Icon Container */}
                        <div className="rounded-full h-11 w-11 bg-[#00A5CF] flex items-center justify-center">
                            <SquareUserRound size={24} color='white' />
                        </div>

                        {/* Heading */}
                        <div>
                            <p className="font-poppins text-[22px] font-semibold"
                            >
                                General <br></br>Support
                            </p>
                        </div>

                        {/* Description */}
                        <div>
                            <p className="font-lato font-medium leading-[24px] text-[18px]">Need a helping hand? Our team is just a click away! We're here to make your experience smooth and enjoyable. </p>
                            <Button className='mt-5 font-lato py-4 font-semibold text-[12px] cursor-pointer bg-[#00A5CF] hover:bg-[#00A5CF] text-[#FFFFFF] leading-[100% '>CONTACT FOR SUPPORT <span className='rotate-225'><ArrowDown size={30} /></span></Button>
                        </div>

                    </div>
                </div>
            </div>
            <div className='bg-[#ffffff] py-15 px-20 '>
                <p className='font-poppins font-bold text-[40px] leading-[100%] tracking-[0%] text-center'>Our Address</p>

                <div className=' border rounded-[30px] mt-12 px-12 gap-10 grid grid-cols-1 lg:grid-cols-1 items-center justify-between'>
                    <div className='rounded-[10px] flex flex-col justify-between p-8 gap-6 bg-[#FFFFFF]  items-center'>
                        {/* Icon Container */}
                        <div className="rounded-full mb-0 h-11 w-11 bg-[#00A5CF] flex items-center justify-center">
                            <MapPin size={24} color='white' />
                        </div>
                        <div>
                            <p className=" text-center font-lato font-medium leading-[30px] text-[18px]">Pristine Square, 4th Floor, 401A Unit,<br /> Shankar Kalate Nagar Road,<br /> Wakad, Pune 411057<br /> Ph - 9607500086  </p>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ContactUs