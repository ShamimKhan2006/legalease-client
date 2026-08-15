// components/about/StorySection.jsx
"use client";

import React from "react";
import { HiLightBulb } from "react-icons/hi";

const StorySection = () => {
  return (
    <section className="py-24 px-6 relative" style={{ background: "#060b16" }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left - Text */}
        <div className="order-2 md:order-1">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
            style={{
              background: "linear-gradient(135deg, #1d4ed8 0%, #2dd4d4 100%)",
            }}
          >
            <HiLightBulb className="text-white text-2xl" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            How We Started
          </h2>
          <p className="text-blue-300 text-[15px] leading-relaxed mb-4">
            LegalEase started after our founder spent three weeks calling
            law firms just to get a straight answer about an immigration
            case. That frustration became the reason this platform exists.
          </p>
          <p className="text-blue-300 text-[15px] leading-relaxed">
            Today, LegalEase connects thousands of people with vetted
            lawyers across immigration, tax, and civil law, built around one
            idea: legal help should be easy to reach.
          </p>
        </div>

        {/* Right - Image */}
        <div className="order-1 md:order-2 relative rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80"
            alt="Team working together"
            className="w-full h-[420px] object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(0,13,26,0.1) 0%, rgba(0,21,46,0.6) 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default StorySection;