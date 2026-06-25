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
  );
};

 export default LoginPage;
// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { Eye } from "lucide-react";
// import { EyeSlash } from "@gravity-ui/icons";
// import { FcGoogle } from "react-icons/fc";
// import { useRouter } from "next/navigation";
// import {
//   Button,
//   FieldError,
//   Form,
//   Input,
//   Label,
//   TextField,
//   Separator,
// } from "@heroui/react";
// import { authClient } from "@/lib/auth-client";

// const LoginPage = () => {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.target);
//     const data = Object.fromEntries(formData);

//     try {
//       await authClient.signIn.email({
//         email: data.email,
//         password: data.password,
//       });

//       router.push("/");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const signIn = async () => {
//     await authClient.signIn.social({
//       provider: "google",
//       callbackURL: "/",
//     });
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center bg-[#0f172a] p-4">
//       <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-600/30 rounded-full blur-[100px]" />

//       <Form
//         onSubmit={handleSubmit}
//         className="relative z-10 w-full max-w-md bg-[#1e293b] border border-slate-700 p-8 rounded-[2rem] shadow-2xl"
//       >
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
//           <p className="text-slate-400 text-sm mt-2">
//             Sign in to continue to your account
//           </p>
//         </div>

//         <TextField
//           isRequired
//           name="email"
//           type="email"
//           className="w-full mb-4"
//         >
//           <Label className="text-slate-300">Email</Label>
//           <Input
//             placeholder="john@example.com"
//             className="w-full"
//           />
//           <FieldError />
//         </TextField>

//         <TextField
//           isRequired
//           name="password"
//           type={showPassword ? "text" : "password"}
//           className="w-full mb-6"
//         >
//           <Label className="text-slate-300">Password</Label>
//           <Input
//             placeholder="••••••••"
//             endContent={
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
//               </button>
//             }
//           />
//           <FieldError />
//         </TextField>

//         <Button
//           type="submit"
//           className="w-full h-12 bg-blue-600 text-white"
//         >
//           Sign In
//         </Button>

//         <p className="text-center text-slate-300 mt-4">
//           Dont have an account?{" "}
//           <Link
//             href="/register"
//             className="text-blue-400 hover:text-blue-300"
//           >
//             Register
//           </Link>
//         </p>

//         <div className="flex items-center gap-3 my-6 w-full">
//           <Separator className="flex-1" />
//           <span className="text-xs text-slate-500">OR</span>
//           <Separator className="flex-1" />
//         </div>

//         <Button
//           type="button"
//           onClick={signIn}
//           className="w-full h-12"
//         >
//           <FcGoogle size={20} />
//           Continue with Google
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default LoginPage;