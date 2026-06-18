"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { Scale, Gavel, Shield, Briefcase } from "lucide-react";

const slides = [
  {
    title: "Find Trusted Lawyers Instantly",
    desc: "Connect with verified legal experts for your case in minutes.",
    icon: Scale,
  },
  {
    title: "Get Legal Advice Anytime",
    desc: "Chat with professional lawyers 24/7 for guidance.",
    icon: Gavel,
  },
  {
    title: "Secure & Confidential Support",
    desc: "Your legal matters are always protected and private.",
    icon: Shield,
  },
  {
    title: "Hire Experts for Your Case",
    desc: "From family law to corporate cases — choose the right lawyer.",
    icon: Briefcase,
  },
];

export default function HeroBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const ActiveIcon = slides[index].icon;

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        
        {/* Icon */}
        <div className="mb-6 p-4 rounded-full bg-white/10">
          <ActiveIcon size={48} />
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold mb-4 transition-all duration-500">
          {slides[index].title}
        </h1>

        {/* Description */}
        <p className="text-gray-300 max-w-2xl mb-8">
          {slides[index].desc}
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4">
          <Button color="primary" size="lg">
            Find Lawyers
          </Button>
          <Button variant="flat" size="lg">
            Learn More
          </Button>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 w-6 rounded-full transition-all ${
                i === index ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
    </section>
  );
}