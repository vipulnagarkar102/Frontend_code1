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
      "answer": "Vtex.ai is a go-to platform for expert-led video subscriptions in emerging tech, healthcare AI, and enterprise solutions. We provide in-depth resources crafted by industry specialists for individual learners, healthcare professionals, and organizations interested in advancing their knowledge. Vtex.ai provides in-depth resources crafted by industry specialists."
    },
    {
      "id": 2,
      "category": "getting-started",
      "question": "What subscription plans does Vtex.ai offer?",
      "answer": "We offer three distinct subscription plans: <br><br/>1) Emerging Tech Plan: Covering cutting-edge topics across technology, AI, Generative AI and their applications.<br><br/> 2) Healthcare AI Plan: Specialized content in AI applications for healthcare, perfect for healthcare professionals and enthusiasts. <br><br/>3) Enterprise Plan: Comprehensive resources suited for teams and organizations seeking deeper insights and scalable solutions."
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
      "answer":  "To access our full library, register on our website. Once registered, you can select a subscription plan that best suits your needs. Plans are billed monthly, and each offers access to:<br/><br/>1) New videos and updates published regularly<br/><br/>2) Video content with hands-on Python demos tailored to healthcare and AI contexts<br/><br/>3) Easy access to our extensive code library with a focus on practical, real-world applications"
    },
    {
      "id": 5,
      "category": "getting-started",
      "question": "Is there a money-back guarantee?",
      "answer": "Yes, we offer a 7-day money-back guarantee on all individual plans. Cancel within the first 7 days, and you'll receive a full refund, minus any applicable payment processing fees."
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
      "answer": "To get started with Vtex.ai, simply visit our Registration page, fill in your details, and choose a password. You'll receive a confirmation email with a link to activate your account."
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
      "answer": "When you're ready to subscribe, visit our Pricing Page to select the plan that best suits your needs. All plans are billed monthly and provide access to a continually updated library of video content. Additionally, we offer on-demand access to demonstration code, with eligibility to access the code for one video every two weeks—up to two video codes per month. For complete details, please review our Terms and Conditions."
    },
    {
      "id": 11,
      "category": "account-related",
      "question": "How does billing work for subscriptions?",
      "answer": "All subscriptions are charged on a monthly basis. You can update your payment details at any time from your Account Settings under Billing Information."
    },
    {
      "id": 12,
      "category": "account-related",
      "question": "What is your refund policy?",
      "answer": "We provide a 7-day money-back guarantee for all new subscribers. If you're not fully satisfied, you can cancel within the first 7 days to receive a full refund, minus applicable payment processing fees. For further details, please refer to our Terms and Conditions. After the initial 7-day period, your subscription will automatically renew on a monthly basis, with the flexibility to cancel anytime before the start of the next billing cycle."
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
      "answer": "If you decide to cancel your subscription, follow these steps:<br/><br/>1) Go to Account Settings and select Manage Subscription.<br/><br/>2) Choose Cancel Subscription. Your access will remain active until the end of your billing period.<br/><br/>3) You will not be charged for the following month."
    },
    {
      "id": 15,
      "category": "account-related",
      "question": "How do I update my profile information?",
      "answer": "You can edit your profile details (such as name, email, and password) anytime under Account Settings > Profile."
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
      "answer": "Vtex.ai subscriptions are billed on a monthly basis. Your subscription will renew automatically each month until you choose to cancel it. You can cancel anytime, and if you do so within the first 30 days, you're eligible for a full refund."
    },
    {
      "id": 20,
      "category": "general",
      "question": "How does a Vtex subscription work?",
      "answer": "Our subscriptions are designed to offer maximum flexibility and value. Choose from three plans—Emerging Tech, Healthcare AI, and Enterprise—that give you access to a continuously updated video library with hands-on, Python-based demos. Each plan is billed monthly, and you'll have full access to new videos as they're released."
    },
    {
      "id": 21,
      "category": "general",
      "question": "Can I pay by the month?",
      "answer": "Yes, Vtex.ai offers a monthly billing option for all individual plans. You'll be charged once per month, with the option to cancel anytime. If you cancel within the first 30 days, you'll receive a full refund; otherwise, the subscription will end with the billing cycle."
    },
    {
      "id": 22,
      "category": "general",
      "question": "How can I get notified of new course launches and content updates?",
      "answer": "To stay updated on new courses and content releases, be sure to enable notifications in your Account Settings. You can also subscribe to our newsletter, where we regularly announce new courses, industry updates, and upcoming features."
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
      "answer": "Yes! You can manage all your account settings, including profile details, subscription preferences, and billing information, through the Account Settings page."
    },
    {
      "id": 26,
      "category": "general",
      "question": "How do I change my profile information?",
      "answer": "To edit your profile:<br/><br/>1) Go to Account Settings and click Profile.<br/><br/>2) Here, you can update your name, email, and other personal details. Make sure to save your changes before exiting."
    },
    {
      "id": 27,
      "category": "general",
      "question": "How do I update my payment information?",
      "answer": "If you need to change or update your payment details:<br/><br/>1) Go to Account Settings and select Billing Information.<br/><br/>2) Here, you can update your payment method to ensure uninterrupted access."
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
          className={`py-3 px-6 font-poppins text-lg sm:text-xl transition-all duration-300 cursor-pointer ${
            activeTab === 'getting-started'
              ? 'border-b-2 border-[#00A5CF] text-[#00A5CF] font-medium'
              : 'text-[#003F5C] hover:text-[#00A5CF]'
          }`}
        >
          Getting Started
        </button>
        <button
          onClick={() => handleTabChange('account-related')}
          className={`py-3 px-6 font-poppins text-lg sm:text-xl transition-all duration-300 cursor-pointer ${
            activeTab === 'account-related'
              ? 'border-b-2 border-[#00A5CF] text-[#00A5CF] font-medium'
              : 'text-[#003F5C] hover:text-[#00A5CF]'
          }`}
        >
          Account Related
        </button>
        <button
          onClick={() => handleTabChange('general')}
          className={`py-3 px-6 font-poppins text-lg sm:text-xl transition-all duration-300 cursor-pointer ${
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
                <span className="text-[#003F5C] font-normal font-poppins text-[17px] sm:text-[22px]">
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
                  ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}
              >
                <div className="pb-2 text-[15px] sm:text-[20px] font-lato font-normal">
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