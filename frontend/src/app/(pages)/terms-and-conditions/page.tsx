"use client";

import React, { useEffect, useState } from "react";
import termsData from "@/app/data/terms.json"; // Ensure the correct path

export default function TermsPage() {
  const [terms, setTerms] = useState([]);

  useEffect(() => {
    if (termsData && Array.isArray(termsData)) {
      setTerms(termsData);
    } else {
      console.error("Error: termsData is not an array or is undefined");
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 ">
      {/* Hero Section */}
      <div
        className="text-grey text-center container mx-auto px-4 mt-30 mb-15 py-20 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('frontend\src\assets\Hero.png')" }}
      >
        <h1 className="text-4xl font-bold text-[#003F5C]">Our Terms & Policies</h1>
        <p className="text-lg mt-2 font-normal text-base text-[#003F5C]">Understand how we protect your data and ensure compliance.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-6">
        {terms.length > 0 ? (
          terms.map((term, index) => (
            <div key={index} className="border p-4 rounded-3xl bg-white">
              <span className="text-3xl  font-poppins">{term.icon}</span>
              <h3 className="font-semibold mt-5 font-normal text-base font-poppins">{term.title}</h3>
              {/* <p className="text-gray-700 mt-2">{term.description}</p> */}

              <a
                href={term.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#003F5C] mt-4 inline-block font-semibold text-base"
              >
                Read More →
              </a>

            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No terms available.</p>
        )}
      </div>
    </div>
  );
}
