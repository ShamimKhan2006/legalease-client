"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { FcGoogle } from "react-icons/fc";
import { Form, Input, Button, Label, Select, ListBox, Separator } from "@heroui/react";

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
      // email: dataObj.email,
      // password: password,
      // name: dataObj.name,
      // image: dataObj.img,
      // additionalData: { role: role },

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
          <Input name="name" label="Full Name" placeholder="John Doe" variant="bordered" className="text-white" />
          <Input name="email" type="email" label="Email" placeholder="john@example.com" variant="bordered" />
          
          <Select label="Role" selectedKeys={[role]} onSelectionChange={(k) => setRole(k.values().next().value)} variant="bordered">
            <ListBox>
              <ListBox.Item id="user">User</ListBox.Item>
              <ListBox.Item id="lawyer">Lawyer</ListBox.Item>
            </ListBox>
          </Select>

          <Input type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} variant="bordered" />
          <Input type="password" label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} variant="bordered" />

          <Button type="submit" className="w-full h-12 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 mt-2">
            Register Now
          </Button>
        </Form>

        <div className='flex items-center gap-3 my-6'>
          <Separator className="flex-1 bg-blue-800" />
          <span className='text-xs text-blue-300 uppercase'>Or</span>
          <Separator className="flex-1 bg-blue-800" />
        </div>

        <Button onClick={() => authClient.signIn.social({ provider: "google" })} className="w-full h-12 bg-white text-blue-900 font-semibold rounded-xl hover:bg-blue-50">
          <FcGoogle className="text-xl mr-2" /> Sign up with Google
        </Button>
      </div>
    </div>
  );
};

export default RegisterPage;