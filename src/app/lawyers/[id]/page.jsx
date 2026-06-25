


// // import ReviewForm from "@/components/ReviewForm";
// // import Image from "next/image";

// // const LawyersDetailsPage = async ({ params }) => {
// //   const { id } =await params;

// //   const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/lawyers/${id}`, {
// //     cache: "no-store",
// //   });
    


// //   const lawyer = await res.json();

// //   // 🔥 if data not found
// //   if (!lawyer) {
// //     return (
// //       <div className="h-screen flex items-center justify-center text-red-500">
// //         Lawyer not found 😢
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-100 py-10 px-4">
// //       <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

// //         {/* Header */}
// //         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
// //           <h1 className="text-3xl font-bold">{lawyer.name}</h1>
// //           <p className="opacity-90 mt-1">{lawyer.specialization}</p>
// //         </div>

// //         <div className="p-8 grid md:grid-cols-3 gap-8">

// //           {/* Left */}
// //           <div className="md:col-span-1 text-center">
// //             <Image
// //               width={400}
// //               height={400}
// //               src={lawyer.image}
// //               alt={lawyer.name}
// //               className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-indigo-500"
// //             />

// //             <div className="mt-4">
// //               <p className="text-gray-600">Hourly Rate</p>
// //               <h2 className="text-2xl font-bold text-indigo-600">
// //                 ${lawyer.hourlyRate}/hr
// //               </h2>
// //             </div>

            
// //               <form action="/api/checkout_sessions" method="POST">
// //       <section>
// //         <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition" type="submit" role="link">
// //           hire now
// //         </button>
// //       </section>
// //     </form>
// //     {/* <PaymentButton lawyer={lawyer}/> */}
        
// //           </div>

// //           {/* Right */}
// //           <div className="md:col-span-2 space-y-4">

// //             <div>
// //               <h2 className="text-xl font-semibold">About Lawyer</h2>
// //               <p className="text-gray-600 mt-2 leading-relaxed">
// //                 {lawyer.description ||
// //                   "Experienced lawyer with strong expertise in legal advisory, corporate law, and client representation."}
// //               </p>
// //             </div>

// //             <div className="grid grid-cols-2 gap-4 mt-6">
// //               <div className="bg-gray-50 p-4 rounded-xl">
// //                 <p className="text-sm text-gray-500">Experience</p>
// //                 <p className="font-bold">
// //                   {lawyer.experience || "5+ Years"}
// //                 </p>
// //               </div>

// //               <div className="bg-gray-50 p-4 rounded-xl">
// //                 <p className="text-sm text-gray-500">Status</p>
// //                 <p className="font-bold text-green-600">
// //                   {lawyer.isBusy ? "Busy" : "Available"}
// //                 </p>
// //               </div>
// //             </div>

// //             {/* Reviews */}
// //             <div className="mt-6">
// //               <h2 className="text-xl font-semibold mb-2">
// //                 Client Reviews
// //               </h2>

// //               <div className="space-y-2">
// //                 <p className="bg-gray-50 p-3 rounded-lg text-sm">
// //                   ⭐⭐⭐⭐⭐ Very professional and helpful lawyer.
// //                 </p>
// //                 <p className="bg-gray-50 p-3 rounded-lg text-sm">
// //                   ⭐⭐⭐⭐ Great experience working with him/her.
// //                 </p>
// //               </div>
// //             </div>

// //           </div>
// //         </div>
// //       </div>
// //      <div className="mt-6">
// //         <ReviewForm lawyerId={id}/>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LawyersDetailsPage;



// //

// // // import Image from "next/image";
// // // import ReviewForm from "@/components/ReviewForm"; // এই কম্পোনেন্টটি নিচে দেওয়া হলো

// // // const LawyersDetailsPage = async ({ params }) => {
// // //   const { id } = await params;

// // //   // ডাটা ফেচ করা
// // //   const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/lawyers/${id}`, { cache: "no-store" });
// // //   const lawyer = await res.json();

// // //   // রিভিউ ফেচ করা
// // //   const reviewsRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/reviews/${id}`, { cache: "no-store" });
// // //   const reviews = await reviewsRes.json();

// // //   if (!lawyer) {
// // //     return <div className="h-screen flex items-center justify-center text-red-500">Lawyer not found 😢</div>;
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gray-100 py-10 px-4">
// // //       <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
// // //         {/* Header */}
// // //         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
// // //           <h1 className="text-3xl font-bold">{lawyer.name}</h1>
// // //           <p className="opacity-90 mt-1">{lawyer.specialization}</p>
// // //         </div>

// // //         <div className="p-8 grid md:grid-cols-3 gap-8">
// // //           {/* Left Side */}
// // //           <div className="md:col-span-1 text-center">
// // //             <Image width={400} height={400} src={lawyer.image} alt={lawyer.name} className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-indigo-500" />
// // //             <div className="mt-4">
// // //               <p className="text-gray-600">Hourly Rate</p>
// // //               <h2 className="text-2xl font-bold text-indigo-600">${lawyer.hourlyRate}/hr</h2>
// // //             </div>
            
// // //             <form action="/api/checkout_sessions" method="POST">
// // //               <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition" type="submit">
// // //                 Hire Now
// // //               </button>
// // //             </form>
// // //           </div>

// // //           {/* Right Side */}
// // //           <div className="md:col-span-2 space-y-6">
// // //             <div>
// // //               <h2 className="text-xl font-semibold">About Lawyer</h2>
// // //               <p className="text-gray-600 mt-2">{lawyer.description || "No description available."}</p>
// // //             </div>

// // //             {/* Reviews Section */}
// // //             <div>
// // //               <h2 className="text-xl font-semibold mb-4">Client Reviews</h2>
// // //               {reviews.length > 0 ? (
// // //                 <div className="space-y-3">
// // //                   {reviews.map((r) => (
// // //                     <div key={r._id} className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-500">
// // //                       <p className="font-bold text-sm">{r.userName}</p>
// // //                       <p className="text-gray-600 text-sm">{r.comment}</p>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               ) : (
// // //                 <p className="text-gray-500 text-sm">No reviews yet.</p>
// // //               )}
// // //             </div>

// // //             {/* Review Form */}
// // //             <ReviewForm lawyerId={id} />
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default LawyersDetailsPage;
// // // "use client"; // যেহেতু হুক এবং হ্যান্ডলার ব্যবহার করছি, তাই এটি 'use client' হতে হবে
// // // import { useState } from "react";
// // // import Image from "next/image";
// // // import axios from "axios";
// // // import { toast } from "react-hot-toast";
// // // import { authClient } from "@/lib/auth-client";
// // // import ReviewForm from "@/components/ReviewForm";

// // // export default function LawyersDetailsPage({ lawyer, reviews, id }) { // params থেকে ডাটা সরাসরি প্রপস হিসেবে আসা ভালো
// // //   const { data: session } = authClient.useSession();
//   const handleHire = async () => {
//     if (!session?.user?.email) {
//             return toast.error("Please login to hire!");
          
//           }

// // //     // ১. Hiring Request পাঠানো (আপনার ডাটাবেসে সেভ করার জন্য)
// // //     const hiringData = {
// // //       lawyerEmail: lawyer.email,
// // //       clientEmail: session.user.email,
// // //       clientName: session.user.name,
// // //       hiringDate: new Date(),
// // //       status: "pending"
// // //     };

// // //     try {
// // //       // রিকোয়েস্ট পাঠানো
// // //       await axios.post("http://localhost:8000/hiring-request", hiringData);
// // //       toast.success("Hiring request sent!");

// // //       // ২. পেমেন্ট পেজে রিডাইরেক্ট করা
// // //       // এখানে আপনার বর্তমান পেমেন্ট ফর্মের লজিকটি কাজ করবে
// // //       document.getElementById("payment-form").submit(); 
      
// // //     } catch (err) {
// // //       toast.error("Failed to process request.");
// // //     }
// // //   };

// // //   return (
// // // //     <div className="min-h-screen bg-gray-100 py-10 px-4">
// //       <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
// //         {/* Header */}
// //         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
// //           <h1 className="text-3xl font-bold">{lawyer.name}</h1>
// //           <p className="opacity-90 mt-1">{lawyer.specialization}</p>
// //         </div>

// //         <div className="p-8 grid md:grid-cols-3 gap-8">
// //           <div className="md:col-span-1 text-center">
// //             <Image width={400} height={400} src={lawyer.image} alt={lawyer.name} className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-indigo-500" />
            
//             {/* পেমেন্ট ফর্ম */}
//             <form id="payment-form" action="/api/checkout_sessions" method="POST">
//               <input type="hidden" name="lawyerId" value={id} />
//               <button 
//                 type="button" 
//                 onClick={handleHire}
//                 className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition"
//               >
//                 Hire Now
//               </button>
//             </form>
// //           </div>

// //           <div className="md:col-span-2 space-y-6">
// //             <div>
// //               <h2 className="text-xl font-semibold">About Lawyer</h2>
// //               <p className="text-gray-600 mt-2">{lawyer.description || "No description available."}</p>
// //             </div>

// // // //             {/* Reviews Section */}
// // // //             <div>
// // // //               <h2 className="text-xl font-semibold mb-4">Client Reviews</h2>
// // // //               {reviews?.length > 0 ? (
// // // //                 <div className="space-y-3">
// // // //                   {reviews.map((r) => (
// // // //                     <div key={r._id} className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-500">
// // // //                       <p className="font-bold text-sm">{r.userName}</p>
// // // //                       <p className="text-gray-600 text-sm">{r.comment}</p>
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
// // // //               ) : (
// // // //                 <p className="text-gray-500 text-sm">No reviews yet.</p>
// // // //               )}
// // //             </div>

// // //             <ReviewForm lawyerId={id} />
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // // import Image from "next/image";
// // // // import ReviewForm from "@/components/ReviewForm";
// // // import HireButton from "@/components/HireButton"; // Import the new component

// // // const LawyersDetailsPage = async ({ params }) => {
// // //   const { id } = await params;

// // //  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/lawyers/${id}`, { cache: "no-store" });

// // // // ডাটা পাওয়ার আগেই রেসপন্স ঠিক আছে কিনা চেক করুন
// // // if (!res.ok) {
// // //   console.error("Server Error:", await res.text()); // HTML এরর বডি প্রিন্ট করবে
// // //   throw new Error(`Failed to fetch lawyer: ${res.status}`);
// // // }

// // // const lawyer = await res.json();

// // //    const reviewsRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/reviews/${id}`, { cache: "no-store" });
// // //  const reviews = await reviewsRes.json();

// // //   if (!lawyer) return <div>Lawyer not found</div>;

// // //   return (
//     // <div className="min-h-screen bg-gray-100 py-10 px-4">
//     //   <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
//     //     <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
//     //       <h1 className="text-3xl font-bold">{lawyer.name}</h1>
//     //       <p className="opacity-90 mt-1">{lawyer.specialization}</p>
//     //     </div>

//     //     <div className="p-8 grid md:grid-cols-3 gap-8">
//     //       <div className="md:col-span-1 text-center">
//     //         <Image width={400} height={400} src={lawyer.image} alt={lawyer.name} className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-indigo-500" />
            
//     //         {/* Using the Client Component here */}
//     //         <HireButton lawyer={lawyer} id={id} />
//     //       </div>

//     //       <div className="md:col-span-2 space-y-6">
//     //         <div>
//     //           <h2 className="text-xl font-semibold">About Lawyer</h2>
//     //           <p className="text-gray-600 mt-2">{lawyer.description}</p>
//     //         </div>

//     //         {/* {/* Reviews Section  */}
//     //         <div>
//     //           <h2 className="text-xl font-semibold mb-4">Client Reviews</h2>
//     //           {reviews.map((r) => (
//     //             <div key={r._id} className="bg-gray-50 p-4 rounded-lg mb-2 border-l-4 border-indigo-500">
//     //               <p className="font-bold text-sm">{r.userName}</p>
//     //               <p className="text-gray-600 text-sm">{r.comment}</p>
//     //             </div>
//     //           ))}
//     //         </div>

//     //         {/* <ReviewForm lawyerId={id} /> */}
//     //       </div>
//     //     </div>
//     //   </div>
//     // </div>

// // //   );
// // // };

// // // export default LawyersDetailsPage;
// // import ReviewForm from "@/components/ReviewForm";

// // const LawyersDetailsPage = async ({ params }) => {
// //   const { id } = await params;

// //   // ডাটাবেস থেকে ডাইনামিক কমেন্টগুলো ফেচ করা
// //   const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/reviews/${id}`, { cache: "no-store" });
// //   const reviews = await res.json();

// //   return (
// //     <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      
// //       {/* ১. স্ট্যাটিক রিভিউ সেকশন (উপরে) */}
// //       <section className="mb-8">
// //         <h2 className="text-xl font-semibold mb-4 text-gray-800">Client Reviews</h2>
// //         <div className="space-y-3">
// //           <p className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">⭐⭐⭐⭐⭐ Very professional and helpful lawyer.</p>
// //           <p className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">⭐⭐⭐⭐ Great experience working with him/her.</p>
// //         </div>
// //       </section>

// //       {/* ২. ডাইনামিক কমেন্ট সেকশন (ফর্মের ঠিক উপরে) */}
// //       <section className="mb-8">
// //         {reviews.length > 0 && (
// //           <h3 className="font-bold text-lg mb-4 text-indigo-600">Recent Feedback</h3>
// //         )}
// //         <div className="space-y-4">
// //           {reviews.map((r) => (
// //             <div key={r._id} className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-sm">
// //               <p className="font-bold text-gray-900">{r.userName}</p>
// //               <p className="text-gray-600 mt-1 leading-relaxed">{r.comment}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* ৩. রিভিউ ফর্ম */}
// //       <ReviewForm lawyerId={id} />
      
// //     </div>
// //   );
// // };

// // export default LawyersDetailsPage;

// // import ReviewForm from "@/components/ReviewForm";
// // import Image from "next/image";

// // const LawyersDetailsPage = async ({ params }) => {
// //   const { id } = await params;
// //   const handleHire = async () => {
   

// //   // লয়ারের ডাটা ফেচ করা (আপনার আগের কোড অনুযায়ী)
// //   const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/lawyers/${id}`, { cache: "no-store" });
// //   const lawyer = await res.json();

// //   // ডাটাবেস থেকে ডাইনামিক কমেন্টগুলো ফেচ করা
// //   const reviewsRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/reviews/${id}`, { cache: "no-store" });
// //   const reviews = await reviewsRes.json();

// //   return (
// //     <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      


   
// //         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
// //           <h1 className="text-3xl font-bold">{lawyer.name}</h1>
// //           <p className="opacity-90 mt-1">{lawyer.specialization}</p>
// //         </div>

// //         <div className="p-8 grid md:grid-cols-3 gap-8">
// //           <div className="md:col-span-1 text-center">
// //             <Image width={400} height={400} src={lawyer.image} alt={lawyer.name} className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-indigo-500" />
            
// //             {/* Using the Client Component here */}
// //             <form id="payment-form" action="/api/checkout_sessions" method="POST">
// //               <input type="hidden" name="lawyerId" value={id} />
// //               <button 
// //                 type="button" 
// //                 onClick={handleHire}
// //                 className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition"
// //               >
// //                 Hire Now
// //               </button>
// //             </form>
// //           </div>

// //           <div className="md:col-span-2 space-y-6">
// //             <div>
// //               <h2 className="text-xl font-semibold">About Lawyer</h2>
// //               <p className="text-gray-600 mt-2">{lawyer.description}</p>
// //             </div>
// //             </div>
// //       {/* স্ট্যাটিক রিভিউ সেকশন */}
// //       <section className="mb-8">
// //         <h2 className="text-xl font-semibold mb-4">Client Reviews</h2>
// //         <div className="space-y-3">
// //           <p className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">⭐⭐⭐⭐⭐ Very professional and helpful lawyer.</p>
// //           <p className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">⭐⭐⭐⭐ Great experience working with him/her.</p>
// //         </div>
// //       </section>

// //       {/* ডাইনামিক কমেন্ট সেকশন (ফর্মের ঠিক উপরে) */}
// //       <section className="mb-8">
// //         {reviews.length > 0 && (
// //           <h3 className="font-bold text-lg mb-4 text-indigo-600">Recent Feedback</h3>
// //         )}
// //         <div className="space-y-4">
// //           {reviews.map((r) => (
// //             <div key={r._id} className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-sm">
// //               <p className="font-bold text-gray-900">{r.userName}</p>
// //               <p className="text-gray-600 mt-1 leading-relaxed">{r.comment}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* রিভিউ ফর্ম */}
// //       <ReviewForm lawyerId={id} />
      
// //     </div>
// //     </div>
// //   );
// // };
// //   }
// // export default LawyersDetailsPage;



// import ReviewForm from "@/components/ReviewForm";
// import Image from "next/image";
// import HireButton from "@/components/HireButton";

// const LawyersDetailsPage = async ({ params }) => {
//   const { id } = await params;

//   // লয়ার এবং রিভিউ ডাটা ফেচ করা
//   const [lawyerRes, reviewsRes] = await Promise.all([
//     fetch(`${process.env.NEXT_PUBLIC_URL}/lawyers/${id}`, { cache: "no-store" }),
//     fetch(`${process.env.NEXT_PUBLIC_URL}/reviews/${id}`, { cache: "no-store" })
//   ]);

//   const lawyer = await lawyerRes.json();
//   const reviews = await reviewsRes.json();

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white rounded-t-2xl">
//         <h1 className="text-3xl font-bold">{lawyer.name}</h1>
//         <p className="opacity-90 mt-1">{lawyer.specialization}</p>
//       </div>
//         <div className="mt-4">
//             <p className="text-gray-600">Hourly Rate</p>
//              <h2 className="text-2xl font-bold text-indigo-600">
//                ${lawyer.hourlyRate}/hr
//               </h2>
//           </div>

//            <div>
//              <h2 className="text-xl font-semibold">About Lawyer</h2>
//            <p className="text-gray-600 mt-2 leading-relaxed">
//                 {lawyer.description ||
//                  "Experienced lawyer with strong expertise in legal advisory, corporate law, and client representation."}
//               </p>
//           </div>
//           <div className="bg-gray-50 p-4 rounded-xl">
//                <p className="text-sm text-gray-500">Status</p>
//                 <p className="font-bold text-green-600">
//               {lawyer.isBusy ? "Busy" : "Available"}
//             </p>
//              </div>
//         </div>

//       <div className="p-8 grid md:grid-cols-3 gap-8 bg-white rounded-b-2xl shadow-sm">
//         <div className="md:col-span-1 text-center">
//           <Image width={400} height={400} src={lawyer.image} alt={lawyer.name} className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-indigo-500" />
          
//           <form id="payment-form" action="/api/checkout_sessions" method="POST">
//             <input type="hidden" name="lawyerId" value={id} />
//             <HireButton />
//           </form>
//         </div>

//         <div className="md:col-span-2 space-y-6">
//           <div>
//             <h2 className="text-xl font-semibold">About Lawyer</h2>
//             <p className="text-gray-600 mt-2">{lawyer.description}</p>
//           </div>
//         </div>
//       </div>
  
//       {/* স্ট্যাটিক রিভিউ সেকশন */}
//       <section className="my-8">
//         <h2 className="text-xl font-semibold mb-4">Client Reviews</h2>
//         <div className="space-y-3">
//           <p className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">⭐⭐⭐⭐⭐ Very professional and helpful lawyer.</p>
//           <p className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">⭐⭐⭐⭐ Great experience working with him/her.</p>
//         </div>
//       </section>

//       {/* ডাইনামিক কমেন্ট সেকশন (ফর্মের উপরে) */}
//       <section className="mb-8">
//         {reviews.length > 0 && <h3 className="font-bold text-lg mb-4 text-indigo-600">Recent Feedback</h3>}
//         <div className="space-y-4">
//           {reviews.map((r) => (
//             <div key={r._id} className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-sm">
//               <p className="font-bold text-gray-900">{r.userName}</p>
//               <p className="text-gray-600 mt-1">{r.comment}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <ReviewForm lawyerId={id} />
//     </div>
//   );
// };

// export default LawyersDetailsPage;


import ReviewForm from "@/components/ReviewForm";
import Image from "next/image";
import HireButton from "@/components/HireButton";

const LawyersDetailsPage = async ({ params }) => {
  const { id } = await params;

  const [lawyerRes, reviewsRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_URL}/lawyers/${id}`, { cache: "no-store" }),
    fetch(`${process.env.NEXT_PUBLIC_URL}/reviews/${id}`, { cache: "no-store" })
  ]);

  const lawyer = await lawyerRes.json();
  const reviews = await reviewsRes.json();

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50/50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-white rounded-3xl p-8 shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-600" />
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <Image width={160} height={160} src={lawyer.image} alt={lawyer.name} className="w-40 h-40 rounded-2xl object-cover shadow-lg" />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-gray-900">{lawyer.name}</h1>
            <p className="text-indigo-600 font-medium text-lg mt-1">{lawyer.specialization}</p>
            <div className="flex gap-4 mt-4 justify-center md:justify-start">
              <span className="px-4 py-1 bg-gray-100 rounded-full text-sm font-semibold text-gray-600">
                Rate: ${lawyer.hourlyRate}/hr
              </span>
              <span className={`px-4 py-1 rounded-full text-sm font-semibold ${lawyer.isBusy ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                {lawyer.isBusy ? "Busy" : "Available"}
              </span>
            </div>
          </div>
          <div className="w-full md:w-48">
            <form id="payment-form" action="/api/checkout_sessions" method="POST">
              <input type="hidden" name="lawyerId" value={id} />
              <HireButton />
            </form>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-4">About Lawyer</h2>
            <p className="text-gray-600 leading-relaxed">{lawyer.description}</p>
          </div>

          {/* Client Reviews Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Client Feedback</h2>
            
            {/* Static Reviews */}
            <div className="grid gap-4 mb-8">
              <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm flex gap-4">
                <span className="text-2xl">⭐</span>
                <p className="text-gray-700">Very professional and helpful lawyer.</p>
              </div>
              <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm flex gap-4">
                <span className="text-2xl">⭐</span>
                <p className="text-gray-700">Great experience working with him/her.</p>
              </div>
            </div>

            {/* Dynamic Reviews */}
            {reviews.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-400 uppercase tracking-wider text-sm">Recent Comments</h3>
                {reviews.map((r) => (
                  <div key={r._id} className="bg-white p-6 rounded-2xl border border-indigo-50 shadow-sm transition-all hover:shadow-md">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-indigo-900">{r.userName}</p>
                      <span className="text-xs text-gray-400">Just now</span>
                    </div>
                    <p className="text-gray-600">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Form Column */}
        <div className="md:col-span-1">
          <div className="sticky top-6">
            <ReviewForm lawyerId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyersDetailsPage;