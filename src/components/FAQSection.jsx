// components/FAQSection.jsx
"use client";

import React, { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

const FAQSection = () => {
  const faqs = [
    {
      q: "How do I choose the right lawyer for my case?",
      a: "Browse by practice area — immigration, tax, civil, and more. Each profile shows their specialty, experience, and past client reviews so you can pick with confidence.",
    },
    {
      q: "Is the first consultation free?",
      a: "Most lawyers on LegalEase offer a free initial consultation to understand your case before any fees are discussed.",
    },
    {
      q: "How quickly will a lawyer respond?",
      a: "Response times vary by lawyer, but most clients hear back within a few hours during business days.",
    },
    {
      q: "Is my information kept confidential?",
      a: "Yes. All communication through LegalEase is private and protected, just like any attorney-client relationship.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      className="py-24 px-6"
      style={{
        background:
          "linear-gradient(135deg, #000d1a 0%, #001f3f 50%, #00152e 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Frequently Asked</span>{" "}
            <span style={{ color: "#2dd4d4" }}>Questions</span>
          </h2>
          <p className="text-blue-300">
            Everything you need to know before getting started.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-xl overflow-hidden transition-all duration-200"
                style={{
                  background: "rgba(0, 30, 65, 0.6)",
                  border: "1px solid rgba(96,165,250,0.18)",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-white font-medium text-[15px]">
                    {f.q}
                  </span>
                  <HiChevronDown
                    className={`text-blue-400 text-xl shrink-0 ml-4 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isOpen ? "200px" : "0px" }}
                >
                  <p className="text-blue-300 text-sm leading-relaxed px-6 pb-5">
                    {f.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;