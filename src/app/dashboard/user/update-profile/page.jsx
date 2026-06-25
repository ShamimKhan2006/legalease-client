"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "@/lib/auth-client";
import { uploadImageToImgBB } from "@/utils/uploadImage";
import Image from "next/image";

export default function UpdateUserProfile() {
  const { data: session, refetch } = useSession();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  // সেশন থেকে ডেটা স্টেটে সেট করা
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploadedUrl = await uploadImageToImgBB(file);
      if (uploadedUrl) {
        setImage(uploadedUrl);
        alert("ছবি সফলভাবে আপলোড হয়েছে!");
      }
    } catch (error) {
      console.error(error);
      alert("ছবি আপলোড ব্যর্থ হয়েছে!");
    } finally {
      setUploading(false);
    }
  };

 const handleUpdate = async (e) => {
    e.preventDefault();

    if (!session?.user?.email) return;

    const updateData = { email: session.user.email, name, image };

    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_URL}/users/update-profile`, updateData);

      if (res.data) {
        alert("প্রোফাইল আপডেট সফল হয়েছে!");
        
        // ১. সেশন ডাটা আপডেট করার জন্য refetch কল করুন
        if (refetch) await refetch();
        
        // ২. রিলোড না করে নেভিগেট করতে চাইলে Router ব্যবহার করতে পারেন
        // router.push("/profile"); 
      }
    } catch (error) {
      console.error("Update Error:", error);
      alert("সার্ভারে ডাটা সেভ করতে সমস্যা হয়েছে!");
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Update Profile</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
            required
          />
        </div>

        {/* Image Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm"
          />

          {uploading && <p className="text-blue-500 text-sm mt-2">আপলোড হচ্ছে...</p>}

          {/* ইমেজ প্রিভিউ - টাইমস্ট্যাম্প সহ যাতে সাথে সাথে আপডেট হয় */}
          <div className="mt-2">
            <Image
              width={80}
              height={80}
              src={image && image.startsWith("http") ? `${image}?t=${new Date().getTime()}` : "/default-avatar.png"}
              alt="Profile"
              className="rounded-full object-cover border"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded disabled:bg-gray-400"
        >
          {uploading ? "Uploading..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}