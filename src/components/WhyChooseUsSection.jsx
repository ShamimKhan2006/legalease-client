// components/WhyChooseUsSection.jsx
"use client";

import React from "react";
import { HiShieldCheck, HiClock, HiUsers } from "react-icons/hi";

const WhyChooseUsSection = () => {
  const points = [
    {
      icon: HiShieldCheck,
      title: "Vetted Experts Only",
      desc: "Every lawyer on LegalEase is licensed, background-checked, and reviewed before joining the network.",
    },
    {
      icon: HiClock,
      title: "Fast Response Times",
      desc: "Most clients hear back from a lawyer within a few hours, not days. No waiting rooms, no runaround.",
    },
    {
      icon: HiUsers,
      title: "Matched to Your Case",
      desc: "Tell us what you're dealing with and we connect you with a specialist in that exact area of law.",
    },
  ];

  return (
    <section className="py-24 px-6 relative" style={{ background: "#060b16" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Why Choose</span>{" "}
            <span style={{ color: "#2dd4d4" }}>LegalEase</span>
          </h2>
          <p className="text-blue-300 max-w-xl mx-auto">
            Getting legal help shouldnt feel like another problem to solve.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(0, 30, 65, 0.5)",
                  border: "1px solid rgba(96,165,250,0.15)",
                }}
              >
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5"
                  style={{
                    background: "linear-gradient(135deg, #1d4ed8 0%, #2dd4d4 100%)",
                  }}
                >
                  <Icon className="text-white text-xl" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-blue-300 text-sm leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;