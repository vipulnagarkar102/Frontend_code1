import Image from 'next/image'
import React from 'react'
import UpsellImage from '@/assets/upsell.png'
import UpsellImage2 from '@/assets/upsell2.png'
import UpsellImage3 from '@/assets/upsell3.png'
import PlanFeatures from './Features'
import { Button } from '@/components/ui/button'
import { ArrowDown, BarChart2, BookOpen, FileText, GitFork, Github, Globe, Laptop, Monitor, Package, Settings, ThumbsUp } from 'lucide-react'
import FeatureCard from './FeatureCard'
import Footer from '@/app/_components/Footer'

const UpSell = () => {

  const features = [
    {
      icon: <ThumbsUp size={24} color="white" />,
      title: "Commercial Usage Rights",
      description: "Deploy AI solutions in business applications"
    },
    {
      icon: <Package size={24} color="white" />,
      title: "Full Source Code & Updates",
      description: "Complete code access with ongoing improvements"
    },
    {
      icon: <FileText size={24} color="white" />,
      title: "Flexible Licensing",
      description: "Custom models, including single-use, multi-use, reseller, and enterprise options"
    },
    {
      icon: <GitFork size={24} color="white" />,
      title: "Reseller License",
      description: "Rights to redistribute under tailored agreements"
    },
    {
      icon: <Github size={24} color="white" />,
      title: "GitHub Integration",
      description: "Streamlined version control and collaboration"
    },
    {
      icon: <BookOpen size={24} color="white" />,
      title: "Documentation & Support",
      description: "Comprehensive guides and priority assistance"
    }
  ];

  const features2 = [
    {
      icon: <Monitor size={24} color="white" />,
      title: "Strategic Advisory",
      description: "Ongoing guidance on AI adoption, architecture, and scaling"
    },
    {
      icon: <Laptop size={24} color="white" />,
      title: "Implementation Support",
      description: "Continuous assistance in deploying and optimizing AI solutions"
    },
    {
      icon: <Globe size={24} color="white" />,
      title: "AI Partnership",
      description: "Long-term collaboration for innovation, governance, and growth"
    },
    {
      icon: <Settings size={24} color="white" />,
      title: "Architecture Review",
      description: "Expert assessments to enhance efficiency, security, and performance"
    },
    {
      icon: <ThumbsUp size={24} color="white" />,
      title: "Best Practices",
      description: "Regular AI model and workflow optimization for better outcomes"
    },
    {
      icon: <BarChart2 size={24} color="white" />,
      title: "Maturity Assessment",
      description: "Evaluating AI systems for scalability, reliability, and compliance"
    }
  ];



  return (
    <div className='mt-26 font-lato text-[#003F5C]'>
        <div className='flex flex-col-reverse md:flex-row gap-10 mt-36 md:mt-42 h-fit items-center justify-center px-4 md:px-12 lg:px-16 2xl:px-28 p-4'>
        
        {/* left div */}

            <div className='md:w-[45%]'>
            <Image
            src={UpsellImage}
            alt='Hero Image'
            // layout='fill' // Use layout='fill' to make the image cover the entire div
            objectFit='cover' // Important for responsiveness
            height={436}
            width={693}
            />
            </div>

            {/* right div */}
            <div className='md:w-[55%]'>
            <p className='font-lato font-extrabold bg-gradient-to-r from-[#00A5CF]/30 via-[#00A5CF]/15 to-[#FFFFFF]/5 pl-8 text-[36px] md:text-[50px] leading-[55px] tracking-[1%]'>Flexible AI Solutions: Buy, Build, or Monetize with us</p>
            </div>

      </div>

      <div className='mt-10 m-4 text-center px-4 md:px-32'>
        <p className='font-extrabold text-[36px] md:text-[50px] mb-4'>Learn & Earn or Buy Instantly</p>
        <p className='font-normal text-[18px] md:text-[18px]'> Vtex.ai grants customers who complete video learning and quizzes access to solution code, including all future updates, delivered monthly for as long as their subscription remains active. For those needing faster access without completing videos or quizzes, Vtex.ai offers flexible Pay-per-Code options for instant AI solution purchases.</p>
      </div>

    {/* Plan Features */}
    <PlanFeatures/>

    <div className='flex flex-col md:flex-row gap-6 mt-20 h-fit items-center justify-center px-6 p-4'>
        
        {/* left div */}

        <div className='md:w-[35%]'>
          <Image
          src={UpsellImage2}
          alt='Hero Image'
          // layout='fill' // Use layout='fill' to make the image cover the entire div
          objectFit='cover' // Important for responsiveness
          height={400}
          width={437}
          />
        </div>

        {/* right div */}
        <div className='md:w-[60%] flex flex-col gap-10'>
          <p className='font-poppins font-semibold text-[36px] md:text-[50px] leading-[55px] tracking-[1%]'><span className='text-[#FFB74D]'>Monetize Our AI – </span>License, Sell, and Grow</p>
          <p className='text-[22px] font-normal'>
          Businesses can expand their offerings by purchasing a commercial license from us, allowing them to resell our AI solutions—featured in our video subscription—to their customers while leveraging our advanced AI ecosystem.
          </p>
          <div>
            <Button className="font-lato py-4 px-6 font-semibold text-[16px] cursor-pointer bg-[#00A5CF] hover:bg-[#00A5CF] text-[#FFFFFF] leading-[100%] flex items-center rounded">
                CONTACT US
                <span className="ml-2 rotate-225">
                <ArrowDown size={20}/>
                </span>
            </Button>
          </div>
        </div>

    </div>

    {/* Feature Cards */}
    <div className="md:mt-10 mt-16 mx-auto px-10 place-items-center grid grid-cols-1 md:grid-cols-2 [@media(min-width:1200px)]:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
    </div>

    <div className='bg-[#E0F7FA] my-16 max-w-screen p-4'>
        <div className='flex flex-col md:flex-row-reverse gap-6 mt-20 h-fit items-center justify-center px-6 p-4'>
            
            {/* left div */}

            <div className='md:w-[35%]'>
            <Image
            src={UpsellImage3}
            alt='Hero Image'
            // layout='fill' // Use layout='fill' to make the image cover the entire div
            objectFit='cover' // Important for responsiveness
            height={400}
            width={437}
            className='rounded-4xl'
            />
            </div>

            {/* right div */}
            <div className='md:w-[60%] flex flex-col gap-10'>
            <p className='font-poppins font-semibold text-[36px] md:text-[50px] leading-[55px] tracking-[1%]'>Personalized <span className='text-[#FFB74D]'>AI Consulting</span> For Maximum Impact</p>
            <p className='text-[22px] font-normal'>
                We offer expert AI consulting to help clients customize and integrate our solutions to meet their unique needs. From optimizing existing models to building tailored implementations, we ensure seamless deployment and maximum business impact.
            </p>
            <div>
                <Button className="font-lato py-4 px-6 font-semibold text-[16px] cursor-pointer bg-[#00A5CF] hover:bg-[#00A5CF] text-[#FFFFFF] leading-[100%] flex items-center rounded">
                REQUEST FOR CONSULTATION
                    <span className="ml-2 rotate-225">
                    <ArrowDown size={20}/>
                    </span>
                </Button>
            </div>
            </div>

        </div>

        {/* Feature Cards */}
        <div className="md:my-10 my-16 mx-auto px-10 place-items-center grid grid-cols-1 md:grid-cols-2 [@media(min-width:1200px)]:grid-cols-3 gap-6">
            {features2.map((feature, index) => (
            <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
            />
            ))}
        </div>
    </div>

    <Footer/>

    </div>
  )
}

export default UpSell