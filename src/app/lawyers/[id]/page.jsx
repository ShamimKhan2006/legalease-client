

import Image from "next/image";

const LawyersDetailsPage = async ({ params }) => {
  const { id } =await params;

  const res = await fetch(`http://localhost:8000/lawyers/${id}`, {
    cache: "no-store",
  });

  const lawyer = await res.json();

  // 🔥 if data not found
  if (!lawyer) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        Lawyer not found 😢
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
          <h1 className="text-3xl font-bold">{lawyer.name}</h1>
          <p className="opacity-90 mt-1">{lawyer.specialization}</p>
        </div>

        <div className="p-8 grid md:grid-cols-3 gap-8">

          {/* Left */}
          <div className="md:col-span-1 text-center">
            <Image
              width={400}
              height={400}
              src={lawyer.image}
              alt={lawyer.name}
              className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-indigo-500"
            />

            <div className="mt-4">
              <p className="text-gray-600">Hourly Rate</p>
              <h2 className="text-2xl font-bold text-indigo-600">
                ${lawyer.hourlyRate}/hr
              </h2>
            </div>

            <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition">
              Hire Now
            </button>
          </div>

          {/* Right */}
          <div className="md:col-span-2 space-y-4">

            <div>
              <h2 className="text-xl font-semibold">About Lawyer</h2>
              <p className="text-gray-600 mt-2 leading-relaxed">
                {lawyer.description ||
                  "Experienced lawyer with strong expertise in legal advisory, corporate law, and client representation."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Experience</p>
                <p className="font-bold">
                  {lawyer.experience || "5+ Years"}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-bold text-green-600">
                  {lawyer.isBusy ? "Busy" : "Available"}
                </p>
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">
                Client Reviews
              </h2>

              <div className="space-y-2">
                <p className="bg-gray-50 p-3 rounded-lg text-sm">
                  ⭐⭐⭐⭐⭐ Very professional and helpful lawyer.
                </p>
                <p className="bg-gray-50 p-3 rounded-lg text-sm">
                  ⭐⭐⭐⭐ Great experience working with him/her.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyersDetailsPage;