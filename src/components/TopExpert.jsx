import Image from "next/image";
import React from "react";

const TopExpert = async () => {
  const res = await fetch("http://localhost:8000/lawyers/top", {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <section className=" relative py-20 px-4 md:px-10 bg-[#0f172a] overflow-hidden">
      {/* ব্যাকগ্রাউন্ড ডেকোরেটিভ এলিমেন্ট */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-10/12 mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-6">
            Meet Our Legal Experts
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-lg">
            Consult with the most trusted legal minds, handpicked for their excellence and dedication.
          </p>
        </div>

        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {data.map((lawyer) => (
            <div
              key={lawyer._id}
              className="group relative bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 rounded-3xl hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-3"
            >
              {/* বর্ডার ইফেক্ট */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative flex justify-center mb-5">
                <div className="p-1 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-500">
                  <Image
                    src={lawyer.image}
                    alt={lawyer.name}
                    width={120}
                    height={120}
                    className="w-24 h-24 rounded-full object-cover border-4 border-[#0f172a]"
                  />
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-bold text-white text-lg mb-1">{lawyer.name}</h3>
                <p className="text-blue-400 text-xs uppercase tracking-widest font-semibold mb-4">
                  {lawyer.specialization}
                </p>
                
                <button className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-600 text-white text-sm font-semibold hover:bg-blue-600 hover:border-blue-600 transition-all">
                  Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopExpert;