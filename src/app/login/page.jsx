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
import Link from "next/link";

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
    <div className="relative min-h-screen flex bg-[#0f172a] overflow-hidden">

      {/* ===================== LEFT SIDE - IMAGE (LAWYER/LEGAL) ===================== */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src="https://plus.unsplash.com/premium_photo-1682088877702-2e518ebad1d6"
          alt="Law and justice"
          className="absolute inset-0 h-full w-full object-cover animate-[imgZoom_16s_ease-in-out_infinite_alternate]"
        />

        {/* Overlay gradient for a premium dark feel */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.85) 100%)",
          }}
        />

        {/* Floating text on top of image */}
        <div className="absolute bottom-0 left-0 right-0 p-10 z-10 animate-[fadeUp_0.9s_cubic-bezier(0.16,1,0.3,1)_both]">
          <h2 className="text-white text-4xl font-bold leading-tight drop-shadow-md">
            Trusted Legal
            <br />
            Guidance, Anytime.
          </h2>
          <p className="text-slate-300 mt-3 max-w-sm">
            Connect with experienced lawyers and manage your legal matters with confidence.
          </p>
        </div>

        {/* Decorative floating glow */}
        <div className="pointer-events-none absolute top-10 right-10 h-40 w-40 rounded-full opacity-30 blur-3xl bg-blue-600 animate-[float_6s_ease-in-out_infinite]" />
      </div>

      {/* ===================== RIGHT SIDE - LOGIN FORM ===================== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 relative">

        {/* Background Glow */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-600/30 rounded-full blur-[100px]" />

        <Form
          className="relative z-10 w-full max-w-md bg-[#1e293b] border border-slate-700 p-8 rounded-[2rem] shadow-2xl animate-[fadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_both]"
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
            <Label className="text-sm font-medium text-slate-300 w-full">
              Email
            </Label>

            <Input
              placeholder="john@example.com"
              className="h-12 px-4 rounded-xl bg-[#0f172a] border border-slate-600 text-white w-full"
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
            <Label className="text-sm font-medium text-slate-300 ">
              Password
            </Label>

            <Input
              placeholder="••••••••"
              className="h-12 px-4 rounded-xl bg-[#0f172a] border border-slate-600 text-white w-full"
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
           <h2 className="text-white text-center mt-4">Have a an Account ? <span className="border-b"><Link href={"/register"}>register?</Link></span></h2>
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

      {/* Animation */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes imgZoom {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;