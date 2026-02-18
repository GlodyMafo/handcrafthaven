"use client"; 

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center p-4" style={{ backgroundColor: "#102820" }}>
       
   
      <div className="flex space-x-6 align-center items-center">
         <h1 className="text-[#CABA9C] font-bold text-2xl pr-14">Handcrafted Haven</h1>
        <Link
          href="/"
          className="text-[#CABA9C] hover:text-[#4C6444] font-semibold"
        >
          Home
        </Link>
        <Link
          href="/shop"
          className="text-[#CABA9C] hover:text-[#4C6444] font-semibold"
        >
          Shop
        </Link>
        <Link
          href="/about"
          className="text-[#CABA9C] hover:text-[#4C6444] font-semibold"
        >
          About
        </Link>
      </div>

    
      <div className="flex space-x-4">
        {session?.user ? (
          <>
            {session.user.role === "SELLER" && (
              <Link
                href="/dashboard"
                className="bg-[#4C6444] text-white px-4 py-2 rounded hover:bg-[#102820] transition"
              >
                Dashboard
              </Link>
            )}
            <button
              onClick={() => signOut()}
              className="bg-[#402B1F] text-white px-4 py-2 rounded hover:bg-[#8A6240] transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="bg-[#8A6240] text-white px-4 py-2 rounded hover:bg-[#402B1F] transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
