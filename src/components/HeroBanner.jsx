"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@heroui/react";
import { Scale, Gavel, Shield, Briefcase } from "lucide-react";

const slides = [
  { title: "Find Trusted Lawyers Instantly", desc: "Connect with verified legal experts for your case in minutes.", icon: Scale },
  { title: "Get Legal Advice Anytime", desc: "Chat with professional lawyers 24/7 for guidance.", icon: Gavel },
  { title: "Secure & Confidential Support", desc: "Your legal matters are always protected and private.", icon: Shield },
  { title: "Hire Experts for Your Case", desc: "From family law to corporate cases — choose the right lawyer.", icon: Briefcase },
];

export default function HeroBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 py-24 px-6">
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Icon */}
            <div className="mb-8 p-4 rounded-3xl bg-white/5 border border-white/10 inline-block">
              {(() => {
                const Icon = slides[index].icon;
                return <Icon size={40} className="text-blue-400" />;
              })()}
            </div>

            {/* Title & Desc */}
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              {slides[index].title}
            </h1>
            <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              {slides[index].desc}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center">
          <Button color="primary" size="lg" className="font-bold px-8">Find Lawyers</Button>
          <Button variant="bordered" size="lg" className="text-white border-white/20 hover:bg-white/10">Learn More</Button>
        </div>

        {/* Progress Dots */}
        <div className="flex gap-3 justify-center mt-16">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-12 bg-blue-500" : "w-6 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}