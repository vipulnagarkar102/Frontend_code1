'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    id: 1,
    question: 'Can I try Vtex.ai before committing to a plan?',
    answer:
      'Yes! We offer a free introductory video for visitors. This video allows you to experience the quality and focus of our content, helping you decide which plan best suits your needs.',
  },
  {
    id: 3,
    question: 'What kind of content is available?',
    answer:
      'We offer a wide range of video tutorials, articles, case studies, and interactive simulations focused on AI and machine learning technologies, tailored for various skill levels.',
  },
];

const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <div className="">
      <div className="space-y-4">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={item.id}
              className={`
                transition-all duration-300 ease-in-out rounded-lg
                ${isOpen
                  ? 'bg-[#F8F7F2] p-4 sm:p-6 shadow-sm'
                  : 'bg-white shadow-lg p-4 sm:p-6' 
                }
              `}
            >
              <div
                onClick={() => handleToggle(index)}
                className="flex justify-between items-center w-full text-left h-auto p-0 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-inherit hover:text-inherit cursor-pointer"
              >
                <span className="font-poppins text-[20px] font-medium mr-4">
                  <p>{item.question}</p>
                </span>
                {/* Icons */}
                {isOpen ? (
                  <Minus className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5}/>
                ) : (
                  <Plus className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5}/>
                )}
              </div>

              {/* Answer Panel */}
              <div
                 id={`faq-answer-${item.id}`}
                 className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${isOpen ? 'max-h-fit' : 'max-h-0'}`}
               >
                 <div className={`pt-3 ${isOpen ? 'visible' : 'invisible'}`}>
                    <p className="font-lato font-normal text-[20px] leading-relaxed">
                      {item.answer}
                    </p>
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FaqAccordion;