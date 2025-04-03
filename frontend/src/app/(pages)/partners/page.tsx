import Image from 'next/image'
import React from 'react'
import UpsellImage from '@/assets/upsell4.png'
import UpsellImage2 from '@/assets/upsell2.png'
import UpsellImage3 from '@/assets/upsell3.png'
import PlanFeatures from '../../customer-dashboard/_components/Features'
import { Button } from '@/components/ui/button'
import { ArrowDown, BarChart2, BookOpen, FileText, GitFork, Github, Globe, Laptop, Monitor, Package, Settings, ThumbsUp } from 'lucide-react'
import FeatureCard from '../../customer-dashboard/_components/FeatureCard'
import Footer from '@/app/_components/Footer'

const Partners = () => {

  const features = [
    {
      icon: <ThumbsUp size={24} color="white" />,
      title: "Thrive from the Start",
      description: "Empower your growth journey—achieve reliable results, increase revenue, and expand into new markets with impactful, on-demand AI and tech insights."
    },
    {
      icon: <Package size={24} color="white" />,
      title: "Partner with the Experts",
      description: "Step into a trusted partnership—enhance your sales and marketing efforts with our support, and equip your team with expert, hands-on training in AI and tech."
    },
    {
      icon: <FileText size={24} color="white" />,
      title: "Drive Innovation Effortlessly",
      description: "Our cutting-edge hands-on practical demos give you a competitive advantage. Leverage them to deliver unique services and custom integrations that drive market growth."
    },
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
    <div className='font-lato text-[#003F5C] '>
      <div className=' bg-[#003F5C]/10 flex flex-col-reverse md:flex-row gap-10  md:mt-26 h-fit items-center justify-center px-4 md:px-12 lg:px-16 2xl:px-28 p-4'>

        {/* left div */}


        <div className='md:w-[55%] '>
          <p className='font-lato font-extrabold  pl-8 text-[36px] md:text-[50px] leading-[55px] tracking-[1%]'>Partners Program</p>
        </div>

        {/* right div */}
        <div className='md:w-[45%] mt-20 mb-20'>
          <Image
            src={UpsellImage}
            alt='Hero Image'
            // layout='fill' // Use layout='fill' to make the image cover the entire div
            objectFit='cover' // Important for responsiveness
            height={436}
            width={693}
          />
        </div>

      </div>

      <div className='mt-10 m-4 text-center px-4 md:px-32'>
        <p className='font-extrabold text-[36px] md:text-[50px] mb-4'>Achieve More, Together</p>
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
                <ArrowDown size={20} />
              </span>
            </Button>
          </div>
        </div>

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
                  <ArrowDown size={20} />
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

      <Footer />

    </div>
  )
}

export default Partners