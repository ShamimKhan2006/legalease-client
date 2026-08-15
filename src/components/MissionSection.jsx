// components/about/MissionSection.jsx
"use client";

import React from "react";
import { HiScale } from "react-icons/hi";

const MissionSection = () => {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #000d1a 0%, #001f3f 50%, #00152e 100%)",
      }}
    >
      <div
        className="absolute top-[-100px] right-[-80px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left - Image */}
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1556157079-9baf751b1d9c?auto=format&fit=crop&w=900&q=80"
            alt="Law office"
            className="w-full h-[420px] object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(0,13,26,0.1) 0%, rgba(0,21,46,0.6) 100%)",
            }}
          />
        </div>

        {/* Right - Text */}
        <div>
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
            style={{
              background: "linear-gradient(135deg, #1d4ed8 0%, #2dd4d4 100%)",
            }}
          >
            <HiScale className="text-white text-2xl" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Our Mission
          </h2>
          <p className="text-blue-300 text-[15px] leading-relaxed mb-4">
            LegalEase exists to close the gap between people who need legal
            help and the lawyers who can actually give it. No confusing
            directories, no cold calls, no guesswork.
          </p>
          <p className="text-blue-300 text-[15px] leading-relaxed">
            We built a platform where finding the right lawyer takes minutes,
            not weeks, and where every match is backed by real credentials
            and real reviews.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;