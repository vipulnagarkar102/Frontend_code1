'use client';
import React from 'react';
import TestimonialCard from './TestimonialCard1';

import image2 from '@/assets/t2.png';
import image3 from '@/assets/t3.png';

// Testimonial data
const CertificationsData = [
  {
    image: image2,
    description:
      'Proudly recognized under by Department for Promotion of Industry and Internal Trade (DPIIT), affirming our innovation-driven approach and enabling access to tax benefits, government grants, and exclusive startup ecosystem opportunities.',
  },
  {
    image: image3,
    description:
      'Recognized as an innovation-driven and scalable venture, gains access to government incentives, regulatory advantages, funding opportunities, and integration into India’s national startup ecosystem.',
  },
];

const Certifications = () => {
  return (
    <div className="my-10 py-10 bg-gradient-to-b from-white to-blue-50">
      <p className="font-poppins font-semibold text-3xl md:text-[40px] text-center text-[#003F5C] mb-10 px-4">
        Certifications
      </p>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch px-4 max-w-7xl mx-auto mb-10">
        {CertificationsData.map((item, index) => (
          <div key={index} className="flex-1">
            <TestimonialCard
              imageSrc={item.image}
              description={item.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
