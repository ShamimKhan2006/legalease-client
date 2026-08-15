// components/TestimonialsSection.jsx
"use client";

import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Immigration Case",
      quote:
        "David walked me through my visa application step by step. I finally felt like someone was actually on my side.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Marcus Chen",
      role: "Tax Dispute",
      quote:
        "Jessica caught an error the IRS made that saved me thousands. Fast, clear, no legal jargon I couldn't follow.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Amanda Reyes",
      role: "Civil Claim",
      quote:
        "Robert responded within hours, not days. My case was resolved faster than I ever expected.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #000d1a 0%, #001f3f 50%, #00152e 100%)",
      }}
    >
      <div
        className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span style={{ color: "#2dd4d4" }}>Trusted by</span>{" "}
            <span className="text-white">Real Clients</span>
          </h2>
          <p className="text-blue-300 max-w-xl mx-auto">
            Real people, real outcomes. Heres what its like to work with our
            network of legal experts.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(0, 30, 65, 0.6)",
                border: "1px solid rgba(96,165,250,0.18)",
                backdropFilter: "blur(10px)",
              }}
            >
              <FaQuoteLeft className="text-2xl" style={{ color: "#2dd4d4" }} />
              <p className="text-slate-200 text-[15px] leading-relaxed flex-1">
                {t.quote}
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-blue-900/50">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2"
                  style={{ borderColor: "#2dd4d4" }}
                />
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-blue-400 text-xs uppercase tracking-wide">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;