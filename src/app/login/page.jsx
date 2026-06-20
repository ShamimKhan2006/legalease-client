"use client";

import React, { useState } from "react";
import { Check, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Separator,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { Eye } from "lucide-react";


const LoginPage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const signIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0f172a] p-4">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-600/30 rounded-full blur-[100px]" />

      <Form
        className="relative z-10 w-full max-w-md bg-[#1e293b] border border-slate-700 p-8 rounded-[2rem] shadow-2xl"
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-400 text-sm">
            Sign in to continue to your account
          </p>
        </div>

        {/* Email */}
        <TextField
          isRequired
          name="email"
          type="email"
          className="space-y-2 mb-4"
        >
          <Label className="text-sm font-medium text-slate-300">
            Email
          </Label>

          <Input
            placeholder="john@example.com"
            className="h-12 px-4 rounded-xl bg-[#0f172a] border border-slate-600 text-white"
          />

          <FieldError className="text-red-400 text-xs" />
        </TextField>

        {/* Password */}
        <TextField
          isRequired
          name="password"
          type={showPassword ? "text" : "password"}
          className="space-y-2 mb-6"
        >
          <Label className="text-sm font-medium text-slate-300">
            Password
          </Label>

          <Input
            placeholder="••••••••"
            className="h-12 px-4 rounded-xl bg-[#0f172a] border border-slate-600 text-white"
            endContent={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-white transition"
              >
                {showPassword ? (
                  <EyeSlash size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            }
          />

          <FieldError className="text-red-400 text-xs" />
        </TextField>

        {/* Login Button */}
        <Button
          type="submit"
          className="h-12 w-full rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all"
        >
          <Check />
          Sign In
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6 w-full">
          <Separator className="flex-1 bg-slate-700" />
          <span className="text-xs font-medium text-slate-500 uppercase">
            Or
          </span>
          <Separator className="flex-1 bg-slate-700" />
        </div>

        {/* Google Login */}
        <Button
          className="h-12 w-full rounded-xl bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 transition-all"
          onClick={signIn}
        >
          <FcGoogle className="text-lg mr-2" />
          Continue with Google
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;