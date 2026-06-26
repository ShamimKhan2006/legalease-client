"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { FcGoogle } from "react-icons/fc";
import { Form, Input, Button, Separator } from "@heroui/react";
import { Label, Radio, RadioGroup} from "@heroui/react";
const RegisterPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const dataObj = Object.fromEntries(formData);

    const { data, error } = await authClient.signUp.email({
       email: dataObj.email,
       password: password,
       name: dataObj.name,
       image: dataObj.img,
      additionalData: { role: role },

      ...dataObj
    });

    if (data) {
      toast.success("Registration Successful!");
      router.push("/login");
    } else if (error) {
      toast.error(error.message || "Registration failed!");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-6 bg-[#001f3f]'>
      {/* নীলের বিভিন্ন শেড দিয়ে ব্যাকগ্রাউন্ড গ্লো */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500 rounded-full blur-[150px] opacity-20"></div>
      
      <div className="w-full max-w-md bg-[#003366] border border-blue-400/20 p-8 rounded-[2rem] shadow-2xl">
        
        <div className="text-center mb-8">
          <h1 className='text-3xl font-bold text-white'>Create Account</h1>
          <p className="text-blue-200 mt-1">Join our professional legal network</p>
        </div>

        <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className='text-white '>Name</label>
          <Input name="name" label="Full Name" placeholder="Enter Your Name" variant="bordered" className="text-white w-full rounded-xl"/>
          <label className='text-white '>Email</label>
          <Input name="email" type="email" label="Email" placeholder="Enter your Email" variant="bordered"  className="w-full rounded-xl"/>
            <label className='text-white '>Image</label>
            <Input name="img" type="img" label="Email" placeholder="Enter  Your Image" variant="bordered"  className="w-full rounded-xl"/>
          
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
    
             <label className='text-white '>Password</label>
          <Input type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} variant="bordered"  className="w-full rounded-xl"/>
          <label className='text-white '>Confirm Password</label>
          <Input type="password" label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} variant="bordered"  className="w-full rounded-xl"/>

          <Button type="submit" className="w-full h-12 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 mt-2">
            Register Now
          </Button>
        </Form>

        <div className='flex items-center gap-3 my-6'>
          <Separator className="flex-1 bg-blue-800" />
          <span className='text-xs text-blue-300 uppercase'>Or</span>
          <Separator className="flex-1 bg-blue-800" />
        </div>

        <Button onClick={() => authClient.signIn.social({ provider: "google" })} className="w-full h-12 bg-slate-800 text-white font-semibold rounded-xl hover:bg-blue-50">
          <FcGoogle className="text-xl mr-2" /> Sign up with Google
        </Button>
      </div>
    </div>
  );
};

export default RegisterPage;