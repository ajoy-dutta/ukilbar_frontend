import { useState, useEffect } from "react";
import homeImage from "../../assets/ukil_build.webp";
import homeImage1 from "../../assets/Ukil_build2.webp";
import homeImage2 from "../../assets/dc.jpg";
import homeImage3 from "../../assets/dolphin.jpg";


export const Carousel = () => {
  const sliders = [
    { img: homeImage, title: "Welcome to Jessore Bar Association" },
    { img: homeImage1, title: "" },
    { img: homeImage2, title: "" },
    { img: homeImage3, title: "" },

  ];

  const [currentSlider, setCurrentSlider] = useState(0);
  const [animationClass, setAnimationClass] = useState("fade-in");

  const nextSlider = () => {
    setAnimationClass("fade-out");
    setTimeout(() => {
      setCurrentSlider((prev) => (prev + 1) % sliders.length);
      setAnimationClass("fade-in");
    }, 300);
  };

  const prevSlider = () => {
    setAnimationClass("fade-out");
    setTimeout(() => {
      setCurrentSlider((prev) => (prev - 1 + sliders.length) % sliders.length);
      setAnimationClass("fade-in");
    }, 300);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlider();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
            <div className="flex flex-col p-2 md:flex-row gap-4">

<div className={`relative w-full md:w-1/2 h-64 sm:h-96 md:h-[350px] overflow-hidden bg-cover bg-center`} 
     style={{
       backgroundImage: `url(${sliders[currentSlider].img})`,
       position: "relative",
     }}>


      {/* Overlay */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Black with 50% opacity
          position: "absolute",
          inset: 0,
          zIndex: 1, // Ensures it's above the image but below content
        }}
      ></div>

      {/* Raw CSS for fade-in and fade-out */}
      <style>
        {`
          .fade-in {
            opacity: 1;
            transform: translateX(0);
            transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
          }
          .fade-out {
            opacity: 0;
            transform: translateX(-10%);
            transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
          }
          .arrow-button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 2; /* Ensures it stays above the overlay */
          }
          .arrow-button:hover {
            background-color: #0095ff;
            color: white;
          }
        `}
      </style>

      {/* Arrows */}
      <button
        onClick={prevSlider}
        className="arrow-button left-5"
        style={{ zIndex: 10 }}
      >
        <svg
          viewBox="0 0 1024 1024"
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path
            fill="#0095FF"
            d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"
          ></path>
        </svg>
      </button>
      <button
        onClick={nextSlider}
        className="arrow-button right-5"
        style={{ zIndex: 10 }}
      >
        <svg
          viewBox="0 0 1024 1024"
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          transform="rotate(180)"
        >
          <path
            fill="#0095FF"
            d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"
          ></path>
        </svg>
      </button>

      {/* Text Container */}
      <div
        className={`absolute px-10 left-5 top-1/3 text-white transition-all duration-500 ease-in-out drop-shadow-lg rounded-lg ${animationClass}`}
        style={{ zIndex: 2 }}
      >
        <h1 className="lg:text-3xl  font-serif mb-3">
          {sliders[currentSlider].title}
        </h1>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg">
          {sliders[currentSlider].des || ""}
        </p>
      </div>
      
    </div>
     <div className="md:w-1/2 overflow-y-auto max-h-[600px] pr-2 text-justify text-gray-800 text-[13px] leading-relaxed space-y-5">
            
                    <h1 className="text-[16px] font-extrabold text-center text-cyan-700 border-b-2 border-cyan-500 inline-block">
          যশোর উকিল বারের ইতিহাস
        </h1>
        <p>
              <span className="text-cyan-700 font-semibold">যশোর উকিল বার</span> বাংলাদেশের অন্যতম প্রাচীন আইনজীবী সমিতি, যার সূচনা ঘটে ব্রিটিশ শাসনামলে। এটি কেবল একটি পেশাগত সংগঠন নয়, বরং এ অঞ্চলের জনগণের ন্যায়বিচারের আশ্রয়স্থল। আইন, সমাজ ও মানবাধিকারের প্রতিটি ক্ষেত্রে যশোর উকিল বার বিশিষ্ট ভূমিকা পালন করে চলেছে।
            </p>
            <p>
              ১৮০০ সালের শুরুতে যশোর শহর ছিল প্রশাসনিক ও বাণিজ্যিক কেন্দ্র। আইনজীবীদের একটি সংগঠিত প্ল্যাটফর্মের প্রয়োজনে প্রতিষ্ঠিত হয় যশোর বার অ্যাসোসিয়েশন। শুরুতে অল্প কিছু সদস্য নিয়ে যাত্রা শুরু করলেও সময়ের সঙ্গে এটি একটি বৃহৎ এবং প্রভাবশালী সংগঠনে রূপান্তরিত হয়। বিচার বিভাগের অংশ হিসেবে এই বার সমাজসেবায়ও গুরুত্বপূর্ণ অবদান রেখেছে। জনসচেতনতা বৃদ্ধি, গরিব ও অসহায়দের জন্য বিনামূল্যে আইনি সহায়তা এবং মানবাধিকার রক্ষা— এইসব কর্মকাণ্ডের মধ্য দিয়ে তারা সমাজের পাশে থেকেছে।
              আধুনিক যুগের চাহিদা অনুযায়ী বারটি প্রযুক্তিগত উন্নয়নের দিকেও নজর দিয়েছে। ডিজিটাল কেস ফাইলিং, অনলাইন কনসাল্টেশন, এবং তথ্যভাণ্ডার রক্ষার মতো কার্যক্রম এই বারকে সময়োপযোগী করে তুলেছে।
            </p>
            <p>
              বর্তমান সভাপতি ও সাধারণ সম্পাদক-এর নেতৃত্বে যশোর উকিল বার নতুন প্রজন্মের আইনজীবীদের জন্য একটি অনুপ্রেরণার উৎস হয়ে দাঁড়িয়েছে। আইন ও ন্যায়বিচার প্রতিষ্ঠায় তাঁদের অবদান অনস্বীকার্য। এই প্রতিষ্ঠানটির প্রতিটি সদস্য ইতিহাস, ঐতিহ্য ও দায়িত্ববোধের সঙ্গে নিজেদের কাজ করে যাচ্ছে, যা আমাদের ন্যায়বিচার ব্যবস্থা এবং গণতন্ত্রকে আরও শক্তিশালী করে।
            </p>
          </div>
          </div>
    
  );
};