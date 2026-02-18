"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push("/seller");
    } else {
      setError("Incorrect email or password");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "#102820" }}
    >
      <form
        onSubmit={handleLogin}
        className="p-8 rounded-xl shadow-lg w-96 flex flex-col gap-4"
        style={{ backgroundColor: "#CABA9C" }}
      >
        <h2
          className="text-2xl font-bold text-center mb-4"
          style={{ color: "#402E1A" }}
        >
          Log In
        </h2>

        <div className="flex flex-col relative">
          <input
            type="email"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-md focus:outline-none peer"
            style={{
              borderColor: "#4C6444",
              backgroundColor: "#F5F2ED",
              color: "#102820",
            }}
            required
          />
          <label
            className="absolute left-3 top-3 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm"
            style={{ color: "#8A6240" }}
          >
            Email
          </label>
        </div>

        <div className="flex flex-col relative">
          <input
            type="password"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-md focus:outline-none peer"
            style={{
              borderColor: "#4C6444",
              backgroundColor: "#F5F2ED",
              color: "#102820",
            }}
            required
          />
          <label
            className="absolute left-3 top-3 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm"
            style={{ color: "#8A6240" }}
          >
            Password
          </label>
        </div>

        {error && (
          <p className="text-sm" style={{ color: "#402E1A" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          className="p-3 rounded-md font-semibold"
          style={{
            backgroundColor: "#8A6240",
            color: "#F5F2ED",
          }}
        >
          Log In
        </button>

        {/* Link to create account */}
        <p className="text-center text-sm mt-4" style={{ color: "#402E1A" }}>
          Don’t have an account?{" "}
          <Link href="/register" className="underline" style={{ color: "#8A6240" }}>
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
