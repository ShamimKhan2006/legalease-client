
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
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/services?email=${session.user.email}`);
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
      await axios.post(`${process.env.NEXT_PUBLIC_URL}/services`, { 
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
      await axios.delete(`${process.env.NEXT_PUBLIC_URL}/services/${id}`);
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













