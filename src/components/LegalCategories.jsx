"use client";

import Link from "next/link";
import { motion } from "framer-motion"; // Add this import

const categories = [
  { name: "Criminal", icon: "⚖️" },
  { name: "Corporate", icon: "🏢" },
  { name: "Family", icon: "👨‍👩‍👧" },
  { name: "Immigration", icon: "✈️" },
  { name: "Property", icon: "🏠" },
  { name: "More", icon: "➕" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 } // Staggered animation
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const LegalCategories = () => {
  return (
    <section className="bg-slate-950 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
            Browse Legal Experts
          </h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {categories.map((cat) => (
            <motion.div key={cat.name} variants={itemVariants}>
              <Link
                href={`/lawyers?category=${cat.name}`}
                className="group relative flex flex-col items-center justify-center p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:bg-blue-600/10 hover:-translate-y-2"
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </div>
                <p className="text-white font-medium text-sm tracking-wide">
                  {cat.name}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LegalCategories;