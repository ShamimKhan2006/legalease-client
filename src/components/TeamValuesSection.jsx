// components/about/TeamValuesSection.jsx
"use client";

import React from "react";
import { HiHeart } from "react-icons/hi";

const TeamValuesSection = () => {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #000d1a 0%, #001f3f 50%, #00152e 100%)",
      }}
    >
      <div
        className="absolute bottom-[-100px] left-[-80px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(45,212,212,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left - Image */}
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=900&q=80"
            alt="Client and lawyer meeting"
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
            <HiHeart className="text-white text-2xl" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            What We Value
          </h2>
          <p className="text-blue-300 text-[15px] leading-relaxed mb-4">
            Every lawyer on our platform is vetted for licensing, experience,
            and client feedback before they ever appear in a search result.
          </p>
          <p className="text-blue-300 text-[15px] leading-relaxed">
            We believe legal help should be transparent, fast, and human —
            not something you have to fight to access.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeamValuesSection;