// "use client";

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';
// import { authClient } from '@/lib/auth-client';
// import { FcGoogle } from "react-icons/fc";
// import { Form, Input, Button, Separator } from "@heroui/react";
// import { Label, Radio, RadioGroup} from "@heroui/react";
// const RegisterPage = () => {
//   const router = useRouter();
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [role, setRole] = useState("user");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     const formData = new FormData(e.currentTarget);
//     const dataObj = Object.fromEntries(formData);

//     const { data, error } = await authClient.signUp.email({
//        email: dataObj.email,
//        password: password,
//        name: dataObj.name,
//        image: dataObj.img,
//       additionalData: { role: role },

//       ...dataObj
//     });

//     if (data) {
//       toast.success("Registration Successful!");
//       router.push("/login");
//     } else if (error) {
//       toast.error(error.message || "Registration failed!");
//     }
//   };

//   return (
//     <div className='min-h-screen flex items-center justify-center p-6 bg-[#001f3f]'>
//       {/* নীলের বিভিন্ন শেড দিয়ে ব্যাকগ্রাউন্ড গ্লো */}
//       <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500 rounded-full blur-[150px] opacity-20"></div>
      
//       <div className="w-full max-w-md bg-[#003366] border border-blue-400/20 p-8 rounded-[2rem] shadow-2xl">
        
//         <div className="text-center mb-8">
//           <h1 className='text-3xl font-bold text-white'>Create Account</h1>
//           <p className="text-blue-200 mt-1">Join our professional legal network</p>
//         </div>

//         <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <label className='text-white '>Name</label>
//           <Input name="name" label="Full Name" placeholder="Enter Your Name" variant="bordered" className="text-white w-full rounded-xl"/>
//           <label className='text-white '>Email</label>
//           <Input name="email" type="email" label="Email" placeholder="Enter your Email" variant="bordered"  className="w-full rounded-xl"/>
//             <label className='text-white '>Image</label>
//             <Input name="img" type="img" label="Email" placeholder="Enter  Your Image" variant="bordered"  className="w-full rounded-xl"/>
          
//                   <div className="flex flex-col gap-4">
//       <Label className=' text-white'>Role</Label>
//       <RadioGroup defaultValue="user" name="role" orientation="horizontal" onChange={value => setRole(value)}>
//         <Radio value="user">
//           <Radio.Content>
//             <Radio.Control>
//               <Radio.Indicator />
//             </Radio.Control >
//             <h4 className="text-white">User</h4>
//           </Radio.Content>
        
//         </Radio>
//         <Radio value="lawyer" >
//           <Radio.Content>
//             <Radio.Control>
//               <Radio.Indicator />
//             </Radio.Control>
//              <h4 className="text-white">Lawyer</h4>
//           </Radio.Content>
          
//         </Radio>
       
//       </RadioGroup>
//     </div>
    
//              <label className='text-white '>Password</label>
//           <Input type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} variant="bordered"  className="w-full rounded-xl"/>
//           <label className='text-white '>Confirm Password</label>
//           <Input type="password" label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} variant="bordered"  className="w-full rounded-xl"/>

//           <Button type="submit" className="w-full h-12 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 mt-2">
//             Register Now
//           </Button>
//         </Form>

//         <div className='flex items-center gap-3 my-6'>
//           <Separator className="flex-1 bg-blue-800" />
//           <span className='text-xs text-blue-300 uppercase'>Or</span>
//           <Separator className="flex-1 bg-blue-800" />
//         </div>

//         <Button onClick={() => authClient.signIn.social({ provider: "google" })} className="w-full h-12 bg-slate-800 text-white font-semibold rounded-xl hover:bg-blue-50">
//           <FcGoogle className="text-xl mr-2" /> Sign up with Google
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;






"use client";
import { Label, Radio, RadioGroup} from "@heroui/react";
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { FcGoogle } from "react-icons/fc";
import {
  HiUser, HiMail, HiLockClosed, HiPhotograph,
  HiBriefcase, HiCheckCircle, HiUpload
} from "react-icons/hi";

;

const RegisterPage = () => {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [imgUrl, setImgUrl] = useState("");
  const [imgPreview, setImgPreview] = useState(null);
  const [imgUploading, setImgUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  // ImgBB তে image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview show করা
    const reader = new FileReader();
    reader.onloadend = () => setImgPreview(reader.result);
    reader.readAsDataURL(file);

    setImgUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        { method: "POST", body: formData }
      );
      const data = await res.json();

      if (data.success) {
        setImgUrl(data.data.url);
        toast.success("Image uploaded!");
      } else {
        toast.error("Image upload failed!");
      }
    } catch {
      toast.error("Image upload error!");
    } finally {
      setImgUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
      image: imgUrl,
      additionalData: { role },
    });
    setLoading(false);

    if (data) {
      toast.success("Registration Successful!");
      router.push("/login");
    } else if (error) {
      toast.error(error.message || "Registration failed!");
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.06)",
    border: "1.5px solid rgba(96,165,250,0.25)",
  };
  const inputFocus = (e) => (e.target.style.border = "1.5px solid rgba(96,165,250,0.7)");
  const inputBlur = (e) => (e.target.style.border = "1.5px solid rgba(96,165,250,0.25)");

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #000d1a 0%, #001f3f 50%, #00152e 100%)" }}>

      {/* Background glows */}
      <div className="absolute top-[-80px] right-[-80px] w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)" }} />
      <div className="absolute bottom-[-60px] left-[-60px] w-[280px] h-[280px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)" }} />

      <div className="w-full max-w-[440px] relative z-10 my-6">
        <div
          className="rounded-[28px] p-8 shadow-2xl"
          style={{
            background: "rgba(0, 30, 65, 0.88)",
            border: "1px solid rgba(96,165,250,0.18)",
            backdropFilter: "blur(16px)"
          }}>

          {/* Header */}
          <div className="text-center mb-7">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
              style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)" }}>
              <HiBriefcase className="text-white text-2xl" />
            </div>
            <h1 className="text-[26px] font-bold text-white tracking-tight">Create Account</h1>
            <p className="text-blue-300 mt-1 text-sm">Join our professional legal network</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-blue-200 text-sm font-medium">Full Name</label>
              <div className="relative">
                <HiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
                <input
                  type="text" required value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full h-12 pl-10 pr-4 rounded-xl text-white text-sm outline-none transition-all duration-200"
                  style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-blue-200 text-sm font-medium">Email</label>
              <div className="relative">
                <HiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
                <input
                  type="email" required value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full h-12 pl-10 pr-4 rounded-xl text-white text-sm outline-none transition-all duration-200"
                  style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
              </div>
            </div>

            {/* Image Upload (ImgBB) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-blue-200 text-sm font-medium">Profile Photo</label>
              <div
                className="w-full rounded-xl flex items-center gap-3 cursor-pointer transition-all duration-200 px-4"
                style={{
                  ...inputStyle,
                  height: "52px",
                  border: "1.5px dashed rgba(96,165,250,0.4)"
                }}
                onClick={() => fileInputRef.current.click()}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload} />

                {imgPreview ? (
                  <>
                    <img src={imgPreview} alt="preview"
                      className="w-9 h-9 rounded-full object-cover border-2 border-blue-400" />
                    <span className="text-blue-300 text-sm flex-1 truncate">
                      {imgUploading ? "Uploading..." : (imgUrl ? "Photo uploaded ✓" : "Preview only...")}
                    </span>
                    {imgUploading && (
                      <span className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    )}
                  </>
                ) : (
                  <>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(59,130,246,0.15)" }}>
                      <HiPhotograph className="text-blue-400 text-lg" />
                    </div>
                    <span className="text-blue-400 text-sm">
                      {imgUploading ? "Uploading..." : "Click to upload photo"}
                    </span>
                    <HiUpload className="text-blue-500 text-sm ml-auto" />
                  </>
                )}
              </div>
            </div>

            {/* Role */}
              <div className="flex flex-col gap-4">
      <Label className=' text-white'>Role</Label>
      <RadioGroup defaultValue="user" name="role" orientation="horizontal" onChange={value => setRole(value)}>
        <Radio value="user">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control >
            <h4 className="text-white">User</h4>
          </Radio.Content>
        
        </Radio>
        <Radio value="lawyer" >
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
             <h4 className="text-white">Lawyer</h4>
          </Radio.Content>
          
        </Radio>
       
      </RadioGroup>
    </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-blue-200 text-sm font-medium">Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
                <input
                  type="password" required value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 pl-10 pr-4 rounded-xl text-white text-sm outline-none transition-all duration-200"
                  style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-blue-200 text-sm font-medium">Confirm Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
                <input
                  type="password" required value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 pl-10 pr-4 rounded-xl text-white text-sm outline-none transition-all duration-200"
                  style={{
                    ...inputStyle,
                    border: confirmPassword && confirmPassword !== password
                      ? "1.5px solid rgba(239,68,68,0.6)"
                      : inputStyle.border
                  }}
                  onFocus={inputFocus}
                  onBlur={e => {
                    e.target.style.border =
                      confirmPassword && confirmPassword !== password
                        ? "1.5px solid rgba(239,68,68,0.6)"
                        : "1.5px solid rgba(96,165,250,0.25)";
                  }} />
              </div>
              {confirmPassword && confirmPassword !== password && (
                <p className="text-red-400 text-xs mt-0.5">Passwords do not match</p>
              )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading || imgUploading}
              className="w-full h-12 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 mt-2 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
                boxShadow: "0 4px 20px rgba(59,130,246,0.35)"
              }}>
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <HiCheckCircle className="text-lg" />
                  Register Now
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: "rgba(96,165,250,0.2)" }} />
            <span className="text-xs text-blue-400 uppercase tracking-widest font-medium">Or</span>
            <div className="flex-1 h-px" style={{ background: "rgba(96,165,250,0.2)" }} />
          </div>

          {/* Google Button */}
          <button
            onClick={() => authClient.signIn.social({ provider: "google" })}
            className="w-full h-12 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-3 transition-all duration-200 active:scale-[0.98]"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1.5px solid rgba(255,255,255,0.15)"
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}>
            <FcGoogle className="text-xl" />
            Sign up with Google
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-blue-300 mt-5">
            Already have an account?{" "}
            <a href="/login" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors underline underline-offset-2">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;