'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: 'getting-started' | 'account-related' | 'general';
}

const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'getting-started' | 'account-related' | 'general'>('getting-started');

  const faqData: FaqItem[] = [
    // Getting Started FAQs
    {
      "id": 1,
      "category": "getting-started",
      "question": "What is Vtex.ai?",
      "answer": "Vtex.ai is your premier destination for expert-driven video solutions and subscription plans across Emerging Tech, HealthTech AI, and customizable enterprise offerings. Our platform features a diverse range of learning formats—from structured subscription tracks to flexible, independent video purchases through FlexPick. Designed by industry experts, our solutions empower individual learners, healthcare professionals, and organizations to deepen their expertise and stay ahead in innovation. Additional options like Pay-Per-Code, Commercial Licensing, and Consulting Services ensure that every user—from solo practitioners to large enterprises—can access tailored, high-impact resources to meet their goals."
    },
    {
      "id": 2,
      "category": "getting-started",
      "question": "What subscription plans does Vtex.ai offer?",
      "answer": "Vtex.ai offers a range of subscription and one-time purchase options tailored to individual users and enterprises, available on a monthly or annual auto-renewal basis, unless cancelled by the user.<br/><br/><b>Subscription Plans:</b><br/>1. Emerging Tech Plan: Explore forward-looking solutions in technology, Artificial Intelligence (AI), Generative AI, and their practical applications.<br/>2. Healthcare AI Plan: Access specialized content focused on AI in healthcare—ideal for medical professionals, researchers, and tech-savvy healthcare enthusiasts.<br/><br/>In addition to subscription plans, users can opt for the FlexPick Plan, which allows one-time purchases of individual solutions based on their interests.<br/><br/><b>Additional Offerings:</b><br/>• Pay-Per-Code: Users can instantly purchase solution code independently of their subscription, providing faster access without the need to complete associated video content or quizzes.<br/>• Enterprise Plan: Designed for organizations seeking to integrate Vtex.ai’s digital assets—including videos and solution code—into their own LMS, or to build white-labeled learning platforms.<br/>• Commercial License: Enterprises may acquire licensing rights to resell or commercially distribute Vtex.ai’s solutions.<br/>• Consulting Services: Enterprises can also collaborate with Vtex.ai through consulting engagements, leveraging our expertise to design, customize, or scale their learning and AI implementation strategies."
    },
    {
      "id": 3,
      "category": "getting-started",
      "question": "Can I try Vtex.ai before subscribing?",
      "answer": "Yes! Vtex.ai offers a free sample video for every visitor. This is a great way to get a sense of our teaching style, content quality, and the depth of our hands-on demos, most of which are built in Python."
    },
    {
      "id": 4,
      "category": "getting-started",
      "question": "How do I get started with Vtex.ai?",
      "answer": "To access our full library, register on our website. Once registered, you can select a subscription plan that best suits your needs. Plans are billed monthly, and each offers access to:<br/><br/>1) New videos and updates published regularly<br/>2) Video content with hands-on Python demos tailored to healthcare and AI contexts<br/>3) Gain access to solution code designed for real-world, practical implementation."
    },
    {
      "id": 5,
      "category": "getting-started",
      "question": "Is there a money-back guarantee?",
      "answer": "We’re confident you’ll find value in our content from day one. While we do not offer a money-back guarantee, we encourage you to explore our free videos available on the platform to experience the quality and depth of our solutions before making a purchase."
    },
    {
      "id": 6,
      "category": "getting-started",
      "question": "Do you offer enterprise solutions?",
      "answer": "Yes! If your organization is interested in a company-wide subscription, we'd love to discuss how Vtex.ai can support your team's needs. Contact us directly to learn more about our Enterprise Plan and bulk subscription options."
    },
    {
      "id": 7,
      "category": "getting-started",
      "question": "Are there any prerequisites for using Vtex.ai?",
      "answer": "With Vtex.ai, you’ll gain hands-on experience and access to the latest in AI and healthcare technology. Our library requires a foundational understanding of Python and related topics, ensuring that the content is impactful and directly applicable. We’re excited to have you start your journey with us and look forward to helping you achieve your learning goals!"
    },
    
    // Account Related FAQs
    {
      "id": 8,
      "category": "account-related",
      "question": "How do I register for a Vtex.ai account?",
      "answer": "To get started with Vtex.ai, simply visit our Registration page, fill in your details, and choose a password. You'll receive a confirmation email with an OTP to activate your account."
    },
    {
      "id": 9,
      "category": "account-related",
      "question": "What are the login best practices?",
      "answer": "After registering, you can log in at any time using your email and password. For security, we recommend using a strong, unique password and enabling two-factor authentication if available."
    },
    {
      "id": 10,
      "category": "account-related",
      "question": "How do I choose a subscription plan?",
      "answer": "When you're ready to subscribe, visit our Offerings page to choose the plan that best matches your learning goals. All plans are available on a monthly or annual auto-renewal basis and provide access to a continually growing library of expert-led solution content.<br/><br/>Subscribers are eligible to receive one solution code approximately every 35 days, upon successful completion of the corresponding quiz. For those who wish to access an additional code sooner, our Pay-Per-Code option allows existing customers to purchase one extra solution code ahead of the 35-day entitlement reset.<br/><br/>Please note that Pay-Per-Code purchases are charged separately and are not deductible from the cost of any active subscription or FlexPick video purchase—even if the code relates to content already covered under your plan.<br/><br/>For full program details and policies, please review our <a href='/terms-and-conditions'><b><u>Terms and Conditions</u></b></a>"
    },
    {
      "id": 11,
      "category": "account-related",
      "question": "How does billing work for subscriptions?",
      "answer": "All subscription plans are billed on a monthly or annual basis. You may update your payment information at any time by navigating to the Billing Information section within your Account Settings."
    },
    {
      "id": 12,
      "category": "account-related",
      "question": "What is your refund policy?",
      "answer": "We encourage you to explore our free expert-led videos to help you make an informed decision before subscribing. Because we provide ample opportunity to evaluate the content upfront, we do not offer refunds once a subscription has been purchased. All subscriptions automatically renew on a monthly or annual basis, with the flexibility to cancel anytime before the next billing cycle. For full details, please review our <a href='/terms-and-conditions'><b><u>Terms and Conditions</u></b></a>."
    },
    {
      "id": 13,
      "category": "account-related",
      "question": "Can I upgrade or downgrade my subscription plan?",
      "answer": "Yes! You can upgrade or downgrade your subscription anytime by visiting Account Settings > Manage Subscription. Plan changes will take effect immediately or at the start of your next billing cycle, depending on your preference."
    },
    {
      "id": 14,
      "category": "account-related",
      "question": "How do I cancel my subscription?",
      "answer": "If you wish to cancel your subscription, please follow these steps:<br/><br/>1. Navigate to your Customer Dashboard and select Manage Subscription.<br/>2. Click on Cancel Subscription. Your access will remain active until the end of your current billing cycle.<br/>3. You will not be charged for the next billing period—whether monthly or annual—based on your current plan."
    },
    {
      "id": 15,
      "category": "account-related",
      "question": "How do I update my profile information?",
      "answer": "You can edit your profile details (such as name, email, and password) anytime under Customer dashboard."
    },
    {
      "id": 16,
      "category": "account-related",
      "question": "How do I update my payment information?",
      "answer": "Manage your payment method in Billing Information to ensure uninterrupted access to Vtex.ai."
    },
    {
      "id": 17,
      "category": "account-related",
      "question": "What if I forget my password?",
      "answer": "Forgot your password? No problem. Use the Forgot Password link on the login page to receive a reset link."
    },
    
    // General FAQs
    {
      "id": 18,
      "category": "general",
      "question": "Can I immediately access my subscription when I sign up?",
      "answer": "Yes! Once you sign up for a Vtex.ai subscription, you'll have immediate access to all the videos and resources within your chosen plan. You can start exploring our video library and hands-on demos right away."
    },
    {
      "id": 19,
      "category": "general",
      "question": "How long does a Vtex subscription last?",
      "answer": "Vtex.ai subscriptions are billed either monthly or annually. Your subscription will automatically renew at the start of each billing cycle unless you choose to cancel. You can manage or cancel your subscription at any time via your customer dashboard."
    },
    {
      "id": 21,
      "category": "general",
      "question": "Can I pay by the month?",
      "answer": "Yes, Vtex.ai offers a monthly billing option for all individual plans. You will be billed monthly and have the flexibility to cancel at any time. Please note that cancellations are not eligible for a refund; however, your subscription will remain active until the end of the current billing cycle."
    },
    {
      "id": 22,
      "category": "general",
      "question": "How can I get notified of new video or new solution launches and content updates?",
      "answer": "Stay informed about new videos, solutions, and content releases by subscribing to our newsletter. Simply use the option in the footer of Vtex.ai to receive regular updates on new courses, industry news, and upcoming features."
    },
    {
      "id": 23,
      "category": "general",
      "question": "How do I contact support?",
      "answer": "If you need assistance, our Customer Support Team is here to help. You can contact us by emailing support@Vtex.ai or through the Support Center on our website, where you'll find resources for troubleshooting and account management."
    },
    {
      "id": 24,
      "category": "general",
      "question": "What are the technical requirements for Vtex.ai?",
      "answer": "To get the best experience from Vtex.ai, you'll need a stable internet connection and a device capable of streaming video, such as a desktop, laptop, or mobile device. Most of our demos are built in Python, so if you plan to follow along, we recommend having Python installed on your device."
    },
    {
      "id": 25,
      "category": "general",
      "question": "Can I manage my account settings?",
      "answer": "Yes! You can manage all your account settings, including profile details, subscription preferences, and billing information, through the Customer dashboard page."
    },
    {
      "id": 26,
      "category": "general",
      "question": "How do I change my profile information?",
      "answer": "To edit your profile:<br/><br/>1) Go to Customer dashboard<br/>2) Here, you can update your name, email, and other personal details. Make sure to save your changes before exiting."
    },
    {
      "id": 27,
      "category": "general",
      "question": "How do I update my payment information?",
      "answer": "If you need to change or update your payment details:<br/><br/>1) Go to Customer dashboard<br/>2) Here, you can update your payment method to ensure uninterrupted access."
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const handleTabChange = (tab: 'getting-started' | 'account-related' | 'general') => {
    setActiveTab(tab);
    setOpenIndex(null); // Close any open accordion when switching tabs
  };

  // Filter FAQ items based on active tab
  const filteredFaqs = faqData.filter(item => item.category === activeTab);

  return (
    <div className="max-w-screen mx-auto p-4 md:p-8 bg-[#ffffff] text-[#003F5C] my-20">
      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row justify-center mb-8 border-b border-gray-200">
        <button
          onClick={() => handleTabChange('getting-started')}
          className={`py-3 px-6 font-poppins text-lg sm:text-xl [@media(min-width:1750px)]:text-[28px] transition-all duration-300 cursor-pointer ${
            activeTab === 'getting-started'
              ? 'border-b-2 border-[#00A5CF] text-[#00A5CF] font-medium'
              : 'text-[#003F5C] hover:text-[#00A5CF]'
          }`}
        >
          Getting Started
        </button>
        <button
          onClick={() => handleTabChange('account-related')}
          className={`py-3 px-6 font-poppins text-lg sm:text-xl [@media(min-width:1750px)]:text-[28px] transition-all duration-300 cursor-pointer ${
            activeTab === 'account-related'
              ? 'border-b-2 border-[#00A5CF] text-[#00A5CF] font-medium'
              : 'text-[#003F5C] hover:text-[#00A5CF]'
          }`}
        >
          Account Related
        </button>
        <button
          onClick={() => handleTabChange('general')}
          className={`py-3 px-6 font-poppins text-lg sm:text-xl [@media(min-width:1750px)]:text-[28px] transition-all duration-300 cursor-pointer ${
            activeTab === 'general'
              ? 'border-b-2 border-[#00A5CF] text-[#00A5CF] font-medium'
              : 'text-[#003F5C] hover:text-[#00A5CF]'
          }`}
        >
          General FAQ
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {filteredFaqs.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={item.id}
              className={`
                border-b border-gray-200 p-4 last:border-b-0 
                ${isOpen ? 'bg-white pb-4' : 'pb-0'}
              `}
            >
              <div
                onClick={() => handleToggle(index)}
                className="flex justify-between items-center w-full text-left py-4 hover:cursor-pointer"
              >
                <span className="text-[#003F5C] font-normal font-poppins text-[20px] md:text-[22px] [@media(min-width:1750px)]:text-[28px]">
                  {item.question}
                </span>
                {isOpen ? (
                  <Minus className="h-5 w-5 text-[#003F5C] flex-shrink-0" />
                ) : (
                  <Plus className="h-5 w-5 text-[#003F5C] flex-shrink-0" />
                )}
              </div>

              {/* Answer Panel */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out
                  ${isOpen ? 'opacity-100' : 'max-h-0 opacity-0'}
                `}
              >
                <div className="pb-2 text-[18px] md:text-[20px] font-lato font-normal [@media(min-width:1750px)]:text-[28px]">
                <p dangerouslySetInnerHTML={{ __html: item.answer }}></p>
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