


import Image from 'next/image';
import React from 'react';
import Link from 'next/link';


const LawyersFeatured = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/lawyers/featured`, { cache: "no-store" });
  const lawyers = await res.json();
      console.log("lawyers",lawyers)
  return (
    <section className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4"> 
      
        <div className="mb-20 text-center">
          <h2 className="text-6xl font-black text-white uppercase tracking-tighter mb-4">
            Elite <span className="text-[#3b82f6]">Counsel</span>
          </h2>
          <p className="text-gray-400">Handpicked legal experts for complex challenges</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lawyers.map((lawyer) => (
            <div
              key={lawyer._id}
              className="relative p-[1px] rounded-[30px] bg-gradient-to-b from-gray-800 to-transparent group overflow-hidden"
            >
          
              <div className="absolute inset-0 bg-blue-500/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative bg-[#0a0a0a] p-8 rounded-[30px] h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20"></div>
                    <Image
                      width={120}
                      height={120}
                      src={lawyer.image}
                      alt={lawyer.name}
                      className="relative rounded-full object-cover border-2 border-gray-800"
                    />
                    <div className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-4 border-[#0a0a0a] ${lawyer.isBusy ? "bg-red-500" : "bg-green-500"}`} />
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-2">{lawyer.name}</h2>
                  <div className="inline-block px-4 py-1 mb-6 rounded-full border border-gray-800 bg-gray-900 text-gray-400 text-xs uppercase tracking-widest font-semibold">
                    {lawyer.specialization}
                  </div>

                  <div className="w-full flex justify-between items-center px-4 py-3 bg-gray-900/50 rounded-2xl mb-6">
                    <span className="text-gray-500 text-sm">Hourly Rate</span>
                    <span className="text-white font-bold text-lg">${lawyer.hourlyRate}</span>
                  </div>

                  <Link href={`/lawyers/${lawyer._id}`} className="w-full">
                    <button className="w-full py-4 rounded-2xl border border-white/10 text-white font-bold hover:bg-white hover:text-black transition-all duration-300">
                      View Dossier
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LawyersFeatured;


// import Image from 'next/image';
// import React from 'react';
// import Link from 'next/link';

// const LawyersFeatured = async () => {
//   const res = await fetch("http://localhost:8000/lawyers/featured", { cache: "no-store" });
//   const lawyers = await res.json();

//   return (
//     <section className="py-24 bg-[#fcfcfc]">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Header Section */}
//         <div className="mb-20">
//           <span className="text-blue-600 font-bold tracking-[0.2em] uppercase text-xs">Expert Selection</span>
//           <h2 className="text-5xl font-extrabold text-gray-900 mt-3">Legal Professionals</h2>
//         </div>

//         {/* Grid Container */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {lawyers.map((lawyer) => (
//             <div
//               key={lawyer._id}
//               className="group bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-500"
//             >
//               <div className="flex justify-between items-start mb-8">
//                 {/* Profile Image with Ring */}
//                 <div className="relative p-1 rounded-full border-2 border-dashed border-gray-200 group-hover:border-blue-500 transition-colors">
//                   <Image
//                     width={80}
//                     height={80}
//                     src={lawyer.image}
//                     alt={lawyer.name}
//                     className="rounded-full object-cover w-20 h-20"
//                   />
//                   <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${lawyer.isBusy ? "bg-amber-400" : "bg-emerald-400"}`} />
//                 </div>
                
//                 {/* Badge */}
//                 <div className="bg-gray-50 text-gray-600 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
//                   ${lawyer.hourlyRate}/hr
//                 </div>
//               </div>

//               {/* Info */}
//               <h3 className="text-2xl font-bold text-gray-900 mb-2">{lawyer.name}</h3>
//               <p className="text-blue-600 text-sm font-medium mb-8 bg-blue-50/50 py-1 px-3 rounded-lg inline-block">
//                 {lawyer.specialization}
//               </p>

//               {/* Action */}
//               <Link href={`/lawyers/${lawyer._id}`}>
//                 <button className="w-full py-4 rounded-2xl bg-gray-900 text-white font-bold hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-4">
//                   View Profile <span>→</span>
//                 </button>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LawyersFeatured;