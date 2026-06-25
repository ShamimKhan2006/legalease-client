// // "use client";
// // import { useState, useEffect } from "react";
// // import axios from "axios";
// // import { authClient } from "@/lib/auth-client";
// // import { uploadImageToImgBB } from "@/utils/uploadImage"; // ইউটিল ফাংশন ইম্পোর্ট
// // import Image from "next/image";

// // export default function ManageLegalProfile() {
// //   const { data: session } = authClient.useSession();
// //   const [formData, setFormData] = useState({ name: "", image: "", bio: "", fee: "", specialization: "" });
// //   const [uploading, setUploading] = useState(false);

// //   useEffect(() => {
// //     if (session?.user?.email) {
// //       axios.get(`http://localhost:8000/users/profile?email=${session.user.email}`)
// //         .then(res => {
// //           if (res.data) setFormData(res.data);
// //         });
// //     }
// //   }, [session]);

// //   const handleImageChange = async (e) => {
// //   const file = e.target?.files?.[0];

// //   if (!file) return;

// //   setUploading(true);

// //   try {
// //     const uploadedUrl = await uploadImageToImgBB(file);

// //     if (uploadedUrl) {
// //       setFormData((prev) => ({
// //         ...prev,
// //         image: uploadedUrl,
// //       }));
// //     }
// //   } catch (err) {
// //     console.error(err);
// //   } finally {
// //     setUploading(false);
// //   }
// // };

// //   const handleSubmit = async (e) => {
// //   e.preventDefault();
// //   try {
// //     const res = await axios.put("http://localhost:8000/users/update-profile", {
// //       ...formData,
// //       email: session.user.email,
// //       role: "lawyer"
// //     });

// //     // সার্ভারের রেসপন্স থেকে result টি বের করে আনুন
// //     const { result } = res.data; 

// //     // এখন চেক করুন
// //     if (result.modifiedCount > 0 || result.upsertedCount > 0) {
// //       alert("আইনজীবী প্রোফাইল সফলভাবে সংরক্ষিত হয়েছে!");
// //     } else {
// //       alert("কোনো তথ্য পরিবর্তিত হয়নি।");
// //     }
// //   } catch (err) {
// //     console.error(err);
// //     alert("তথ্য আপডেট করা যায়নি।");
// //   }
// // };

// //   return (
// //     <div className="max-w-xl bg-white p-6 rounded-lg shadow">
// //       <h2 className="text-xl font-bold mb-4">Manage Legal Profile & Services</h2>
// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         <div>
// //           <label className="block text-sm font-medium">Full Name</label>
// //           <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full p-2 border rounded" required />
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium">Specialization</label>
// //           <input type="text" value={formData.specialization} onChange={e => setFormData({ ...formData, specialization: e.target.value })} className="w-full p-2 border rounded" required />
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium">Hiring Fee (BDT)</label>
// //           <input type="number" value={formData.fee} onChange={e => setFormData({ ...formData, fee: e.target.value })} className="w-full p-2 border rounded" required />
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium">Short Bio</label>
// //           <textarea value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} className="w-full p-2 border rounded" rows="3"></textarea>
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium">Profile Image</label>
// //           <input type="file" accept="image/*" onChange={handleImageChange} className="block text-sm mt-1" />
// //           {uploading && <p className="text-blue-500 text-xs">imgBB-তে ছবি আপলোড হচ্ছে...</p>}
// //           {formData.image && <Image src={formData.image} alt="Lawyer" width={92} height={92} className=" object-cover rounded mt-2 border" />}
// //         </div>
// //         <button  type="submit" disabled={uploading} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400">
// //           {uploading ? "Uploading Image..." : "Save Services Info"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { authClient } from "@/lib/auth-client";
// import { uploadImageToImgBB } from "@/utils/uploadImage";
// import { Trash2, PlusCircle, LayoutDashboard, UploadCloud } from "lucide-react";
// import Image from "next/image";

// export default function ManageLegalProfile() {
//   const { data: session } = authClient.useSession();
//   const [services, setServices] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [formData, setFormData] = useState({ name: "", bio: "", fee: "", image: "" });

//   const fetchServices = async () => {
//     if (session?.user?.email) {
//       const res = await axios.get(`http://localhost:8000/services?email=${session.user.email}`);
//       setServices(res.data);
//     }
//   };

//   useEffect(() => {
//     fetchServices();
//   }, [session]);

//   // ইমেজ আপলোড হ্যান্ডলার
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setUploading(true);
//     try {
//       const imageUrl = await uploadImageToImgBB(file);
//       setFormData({ ...formData, image: imageUrl });
//       alert("ছবি আপলোড সফল হয়েছে!");
//     } catch (err) {
//       alert("ছবি আপলোড ব্যর্থ হয়েছে!");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.image) return alert("দয়া করে একটি ছবি আপলোড করুন!");
    
//     await axios.post("http://localhost:8000/services", { ...formData, lawyerEmail: session.user.email });
//     alert("সার্ভিস সফলভাবে যোগ করা হয়েছে!");
//     setFormData({ name: "", bio: "", fee: "", image: "" });
//     fetchServices();
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:8000/services/${id}`);
//     setServices(services.filter((s) => s._id !== id));
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
//       <div className="flex items-center gap-3 mb-8">
//         <LayoutDashboard className="text-blue-600 w-8 h-8" />
//         <h2 className="text-3xl font-extrabold text-gray-800">Manage Services</h2>
//       </div>

//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10">
//         <h3 className="text-lg font-semibold mb-4 text-gray-700">Add New Service</h3>
        
//         {/* ইমেজ আপলোড এরিয়া */}
//         <div className="mb-4">
//           <label className="flex items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition">
//             <UploadCloud className="text-gray-400" />
//             <span className="text-gray-500">{uploading ? "Uploading..." : "Upload Service Image"}</span>
//             <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
//           </label>
//           {formData.image && <Image src={formData.image} alt="Preview" width={80} height={80} className="mt-2 rounded-lg" />}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input type="text" placeholder="Service Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="p-3 border rounded-xl" required />
//           <input type="number" placeholder="Fee (BDT)" value={formData.fee} onChange={e => setFormData({...formData, fee: e.target.value})} className="p-3 border rounded-xl" required />
//           <textarea placeholder="Service Details" value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="md:col-span-2 p-3 border rounded-xl" rows="3" />
//         </div>
        
//         <button type="submit" className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
//           <PlusCircle size={20} /> Add Service
//         </button>
//       </form>

//       {/* সার্ভিস টেবিল */}
//       <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
//         <table className="w-full text-left">
//           <thead className="bg-gray-50 text-gray-600 uppercase text-sm">
//             <tr>
//               <th className="p-4">Image</th>
//               <th className="p-4">Name</th>
//               <th className="p-4">Fee</th>
//               <th className="p-4 text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {services.map((s) => (
//               <tr key={s._id} className="hover:bg-gray-50 transition">
//                 <td className="p-4"><Image src={s.image} alt="service" width={50} height={50} className="rounded-lg" /></td>
//                 <td className="p-4 font-medium text-gray-800">{s.name}</td>
//                 <td className="p-4 text-blue-600 font-bold">{s.fee} BDT</td>
//                 <td className="p-4 text-center">
//                   <button onClick={() => handleDelete(s._id)} className="text-red-400 hover:text-red-600"><Trash2 size={20} /></button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import { uploadImageToImgBB } from "@/utils/uploadImage";
import { Trash2, PlusCircle, Briefcase, UploadCloud, DollarSign, Loader2 } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ManageLegalProfile() {
  const { data: session } = authClient.useSession();
  const [services, setServices] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({ name: "", bio: "", fee: "", image: "" });

  const fetchServices = async () => {
    if (session?.user?.email) {
      try {
        const res = await axios.get(`http://localhost:8000/services?email=${session.user.email}`);
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    }
  };

  useEffect(() => {
    fetchServices();
  }, [session]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await uploadImageToImgBB(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
      toast.success("Image uploaded successfully!");
    } catch (err) {
      toast.error("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) return toast.error("Please upload a service cover image!");
    if (!session?.user?.email) return toast.error("Session expired. Please log in.");

    try {
      await axios.post("http://localhost:8000/services", { 
        ...formData, 
        fee: parseFloat(formData.fee),
        lawyerEmail: session.user.email 
      });
      toast.success("Service published successfully!");
      setFormData({ name: "", bio: "", fee: "", image: "" });
      fetchServices();
    } catch (err) {
      toast.error("Failed to publish service.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/services/${id}`);
      setServices(services.filter((s) => s._id !== id));
      toast.success("Service removed successfully!");
    } catch (err) {
      toast.error("Error deleting service.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] p-4 md:p-8 text-slate-200 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-8">
          <div className="p-4 bg-indigo-600/20 rounded-3xl border border-indigo-500/30">
            <Briefcase className="text-indigo-400 w-9 h-9" />
          </div>
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white">Legal Service Catalog</h2>
            <p className="text-indigo-300/60 mt-1 uppercase tracking-widest text-xs font-semibold">Professional Practice Management</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Form */}
          <div className="lg:col-span-1 bg-[#111827] p-8 rounded-3xl border border-white/5 shadow-2xl">
            <h3 className="text-lg font-bold mb-8 text-white flex items-center gap-2">
              <PlusCircle size={20} className="text-indigo-500" /> Register New Service
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <label className="group relative flex flex-col items-center justify-center h-40 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-indigo-500/50 bg-[#0f172a] transition-all">
                {uploading ? (
                  <Loader2 className="text-indigo-400 animate-spin w-8 h-8" />
                ) : formData.image ? (
                  <Image src={formData.image} alt="Cover" fill className="object-cover rounded-2xl" />
                ) : (
                  <div className="flex flex-col items-center text-slate-500">
                    <UploadCloud size={30} className="mb-2" />
                    <span className="text-xs">Click to upload cover</span>
                  </div>
                )}
                <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" disabled={uploading} />
              </label>

              <div className="space-y-4">
                <input type="text" placeholder="Service Title" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 bg-[#0f172a] border border-white/10 rounded-xl focus:border-indigo-500 outline-none transition text-sm" required />
                
                <div className="relative">
                  <span className="absolute left-4 top-4 text-emerald-500 font-bold">$</span>
                  <input type="number" placeholder="0.00" value={formData.fee} onChange={e => setFormData({...formData, fee: e.target.value})} className="w-full pl-8 p-4 bg-[#0f172a] border border-white/10 rounded-xl focus:border-indigo-500 outline-none transition text-sm" required />
                </div>

                <textarea placeholder="Service Description..." value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full p-4 bg-[#0f172a] border border-white/10 rounded-xl focus:border-indigo-500 outline-none transition text-sm h-24" required />
              </div>
              
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-600/20">
                Publish Service
              </button>
            </form>
          </div>

          {/* List */}
          <div className="lg:col-span-2 bg-[#111827] rounded-3xl border border-white/5 shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Published Services</h3>
              <span className="bg-white/5 px-3 py-1 rounded-full text-xs font-mono">{services.length} Total</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/5">
                    <th className="p-6">Package</th>
                    <th className="p-6">Details</th>
                    <th className="p-6">Rate</th>
                    <th className="p-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {services.map((s) => (
                    <tr key={s._id} className="hover:bg-white/5 transition">
                      <td className="p-6">
                        <div className="w-16 h-16 rounded-xl bg-slate-900 overflow-hidden border border-white/5">
                          <Image src={s.image} alt="svc" width={64} height={64} className="object-cover" />
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="font-semibold text-white">{s.name}</div>
                        <div className="text-xs text-slate-500 max-w-[200px] truncate">{s.bio}</div>
                      </td>
                      <td className="p-6 text-emerald-400 font-black flex items-center gap-1 mt-6">
                        <DollarSign size={14}/> {parseFloat(s.fee || 0).toFixed(2)}
                      </td>
                      <td className="p-6 text-right">
                        <button onClick={() => handleDelete(s._id)} className="text-slate-600 hover:text-rose-500 p-2">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}