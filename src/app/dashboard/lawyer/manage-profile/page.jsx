"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import { uploadImageToImgBB } from "@/utils/uploadImage"; // ইউটিল ফাংশন ইম্পোর্ট

export default function ManageLegalProfile() {
  const { data: session } = authClient.useSession();
  const [formData, setFormData] = useState({ name: "", image: "", bio: "", fee: "", specialization: "" });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      axios.get(`http://localhost:8000/users/profile?email=${session.user.email}`)
        .then(res => {
          if (res.data) setFormData(res.data);
        });
    }
  }, [session]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploadedUrl = await uploadImageToImgBB(file);
      if (uploadedUrl) {
        setFormData(prev => ({ ...prev, image: uploadedUrl }));
        alert("লয়ার প্রোফাইল ছবি আপলোড হয়েছে!");
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:8000/users/update-profile", {
        ...formData,
        email: session.user.email,
        role: "lawyer"
      });
      if (res.data.modifiedCount > 0 || res.data.upsertedCount > 0) alert("আইনজীবী প্রোফাইল সফলভাবে সংরক্ষিত হয়েছে!");
    } catch (err) {
      alert("তথ্য আপডেট করা যায়নি।");
    }
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Manage Legal Profile & Services</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Specialization</label>
          <input type="text" value={formData.specialization} onChange={e => setFormData({ ...formData, specialization: e.target.value })} className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Hiring Fee (BDT)</label>
          <input type="number" value={formData.fee} onChange={e => setFormData({ ...formData, fee: e.target.value })} className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Short Bio</label>
          <textarea value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} className="w-full p-2 border rounded" rows="3"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium">Profile Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="block text-sm mt-1" />
          {uploading && <p className="text-blue-500 text-xs">imgBB-তে ছবি আপলোড হচ্ছে...</p>}
          {formData.image && <img src={formData.image} alt="Lawyer" className="w-24 h-24 object-cover rounded mt-2 border" />}
        </div>
        <button type="submit" disabled={uploading} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400">
          {uploading ? "Uploading Image..." : "Save Services Info"}
        </button>
      </form>
    </div>
  );
}