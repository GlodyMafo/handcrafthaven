"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    if (res.ok) {
      alert("Account created successfully!");
      router.push("/login");
    } else {
      alert("Registration error");
    }
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "#102820" }}
    >
      <form
        onSubmit={handleRegister}
        className="p-8 rounded-xl shadow-lg w-96 flex flex-col gap-4"
        style={{ backgroundColor: "#CABA9C" }}
      >
        <h2
          className="text-2xl font-bold text-center mb-2"
          style={{ color: "#402E1A" }}
        >
          Create Account
        </h2>

        {/* Name */}
        <div className="flex flex-col relative">
          <input
            type="text"
            placeholder=" "
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            Full Name
          </label>
        </div>

        {/* Email */}
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

        {/* Password */}
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

        {/* Role */}
        <select
          className="border p-3 rounded-md focus:outline-none"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            borderColor: "#4C6444",
            backgroundColor: "#F5F2ED",
            color: "#102820",
          }}
        >
          <option value="USER">Buyer</option>
          <option value="SELLER">Seller</option>
        </select>

        {/* Button */}
        <button
          type="submit"
          className="p-3 rounded-md font-semibold mt-2 transition hover:opacity-90"
          style={{
            backgroundColor: "#8A6240",
            color: "#F5F2ED",
          }}
        >
          Create Account
        </button>

        {/* Link to login */}
        <p className="text-center text-sm mt-2" style={{ color: "#402E1A" }}>
          Already have an account?{" "}
          <Link href="/login" className="underline" style={{ color: "#8A6240" }}>
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
