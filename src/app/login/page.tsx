"use client";
import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  SelectItem,
  Checkbox,
  Button,
} from "@heroui/react";
import bcrypt from "bcryptjs";
//
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export default function App() {
  const [username, setUsername] = React.useState("");
  const [submitted, setSubmitted] = React.useState(null);
  const [errors, setErrors] = React.useState<any>({});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <>
      <div className="text-3xl text-center mb-5">Sign In With Google</div>

      <Button className="w-full" color="primary" onPress={() => signIn()}>
        Sign in
      </Button>
    </>
  );
}
