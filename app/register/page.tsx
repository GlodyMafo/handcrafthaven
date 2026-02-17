"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
      alert("Compte créé avec succès !");
      router.push("/login");
    } else {
      alert("Erreur lors de l'inscription");
    }
  }

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-2 w-64 mx-auto mt-20">
      <input placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} className="border p-2" />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2" />
      <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2" />

      <select className="border p-2" value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="USER">Acheteur</option>
        <option value="SELLER">Vendeur</option>
      </select>

      <button className="bg-black text-white p-2 mt-2">Créer le compte</button>
    </form>
  );
}
