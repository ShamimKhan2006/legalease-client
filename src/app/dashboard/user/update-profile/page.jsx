"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import { uploadImageToImgBB } from "@/utils/uploadImage"; // ইউটিল ফাংশন ইম্পোর্ট
import Image from "next/image";

export default function UpdateUserProfile() {
  const { data: session } = authClient.useSession();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      // imgBB তে আপলোড করে সরাসরি URL নিয়ে আসা হচ্ছে
      const uploadedUrl = await uploadImageToImgBB(file);
      console.log("Uploaded URL:", uploadedUrl);
      if (uploadedUrl) {
        setImage(uploadedUrl);
        alert("ছবি সফলভাবে আপলোড হয়েছে!");
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

//   const handleUpdate = async (e) => {
//   e.preventDefault();
//   try {
//     const res = await axios.put("http://localhost:8000/users/update-profile", {
//       email: session.user.email,
//       name,
//       image,
//       role: "user"
//     });

//     if (res.data.modifiedCount > 0 || res.data.upsertedCount > 0) {
//       alert("প্রোফাইল আপডেট সম্পন্ন হয়েছে!");
      
//       // গুরুত্বপূর্ণ: সেশন রিফ্রেশ করার কমান্ড এখানে যোগ করুন
//       // উদাহরণস্বরূপ (আপনার লাইব্রেরির ডকুমেন্টেশন দেখুন):
//       if (authClient.refetch) {
//         await authClient.refetch(); 
//       }
//       // অথবা যদি ম্যানুয়ালি আপডেট করতে হয়:
//       window.location.reload(); // এটি সাময়িক সমাধান, তবে রিফ্রেশ মেথড ব্যবহার করাই উত্তম।
//     }
//   } catch (err) {
//     alert("ব্যাকএন্ডে প্রোফাইল সেভ করা যায়নি।");
//   }
// };

const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.put("http://localhost:8000/users/update-profile", {
      email: session.user.email,
      name,
      image,
      role: "user"
    });

    if (res.data.modifiedCount > 0 || res.data.upsertedCount > 0) {
      alert("প্রোফাইল আপডেট হয়েছে!");
      
      // স্টেট ম্যানুয়ালি আপডেট করুন (পেজ রিলোড ছাড়াই নাম ও ছবি বদলে যাবে)
      session.user.name = name;
      session.user.image = image;
      
      // refetch এর বদলে এখানে শুধু লোকাল স্টেট রি-রেন্ডার হতে দিন
      window.location.reload(); 
    }
  } catch (err) {
    console.error(err);
  }
};
  return (
    <div className="max-w-md bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full p-2 border rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full text-sm" />
          {uploading && <p className="text-xs text-blue-500 mt-1">imgBB-তে আপলোড হচ্ছে, অপেক্ষা করুন...</p>}
          {image && <Image width={80} height={80} src={image.startsWith("http") ? image : "/default-avatar.png"} alt="Profile" className=" rounded-full mt-2 object-cover border" />}
        </div>
        <button type="submit" disabled={uploading} onClick={handleUpdate} className={`w-full p-2 rounded text-white ${uploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
          {uploading ? "Uploading..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}


