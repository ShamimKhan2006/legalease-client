"use client";

import { useState, useEffect } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { uploadImageToImgBB } from "@/utils/uploadImage";
import Image from "next/image";
import { Camera, User, Mail, Save, Loader2 } from "lucide-react";

export default function UpdateUserProfile() {
  const { data: session } = useSession();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
      setEmail(session.user.email || "");
    }
  }, [session]);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploadedUrl = await uploadImageToImgBB(file);
      if (uploadedUrl) setImage(uploadedUrl);
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

    setLoading(true);
    try {
      await authClient.updateUser({ name, image });

      if (email !== session.user.email) {
        await authClient.changeEmail({
          newEmail: email,
          callbackURL: "/dashboard",
        });
        alert("নতুন email এ verification link পাঠানো হয়েছে!");
      } else {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Update Error:", error);
      alert("আপডেট করতে সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Card */}
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          
          {/* Top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full" />

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">Edit Profile</h2>
            <p className="text-slate-400 text-sm mt-1">Update your personal information</p>
          </div>

          {/* Avatar Section */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl overflow-hidden ring-2 ring-white/10 ring-offset-2 ring-offset-slate-900">
                <Image
                  width={96}
                  height={96}
                  src={image && image.startsWith("http") ? image : "/default-avatar.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Upload overlay */}
              <label className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                {uploading ? (
                  <Loader2 size={20} className="text-white animate-spin" />
                ) : (
                  <Camera size={20} className="text-white" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {/* Online indicator */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900" />
            </div>
          </div>
          {uploading && (
            <p className="text-center text-indigo-400 text-xs mb-4 animate-pulse">আপলোড হচ্ছে...</p>
          )}

          {/* Form */}
          <form onSubmit={handleUpdate} className="space-y-4">
            
            {/* Name */}
            <div className="group">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 block">
                Full Name
              </label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all text-sm"
                  placeholder="Your full name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all text-sm"
                  placeholder="your@email.com"
                  required
                />
              </div>
              {email !== session?.user?.email && (
                <p className="text-amber-400 text-xs mt-2 flex items-center gap-1">
                  ⚠️ Email পরিবর্তন করলে verification link পাঠানো হবে
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={uploading || loading}
              className="w-full mt-2 relative overflow-hidden bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>আপডেট হচ্ছে...</span>
                </>
              ) : success ? (
                <>
                  <span>✓</span>
                  <span>সফল হয়েছে!</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </form>

          {/* Success toast */}
          {success && (
            <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm text-center">
              ✓ প্রোফাইল সফলভাবে আপডেট হয়েছে!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}