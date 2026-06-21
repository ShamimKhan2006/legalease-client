
import Image from "next/image";
import Link from "next/link";

 const LawyersPage = async ({searchParams}) => {
   const category =await searchParams?.category;

//   const res = await fetch("http://localhost:8000/lawyers", {
//     cache: "no-store",
//   });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/lawyers${
      category ? `?category=${category}` : ""
    }`,
    {
      cache: "no-store",
    }
  );

  const lawyers = await res.json();

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
                  {/* গ্লো ইফেক্ট যা হোভারে অ্যাক্টিভেট হয় */}
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

export default LawyersPage;