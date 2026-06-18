"use client";

import React from "react";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData);

    console.log(data);

    try {
      const result = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      console.log(result);

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div className="flex justify-center items-center min-h-screen">
      <Form
        className="flex flex-col gap-4 rounded-2xl shadow-md py-10 px-6 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center font-bold text-3xl mb-5">
          Welcome to Login
        </h1>

        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
            ) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>

        <div className="flex gap-2">
          <Button type="submit">
            <Check />
            Submit
          </Button>

          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;