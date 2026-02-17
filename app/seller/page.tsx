"use client";

import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    getSession().then((sess) => {
      if (!sess || sess.user.role !== "SELLER") router.push("/login");
      else setSession(sess);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, price, imageUrl }),
      credentials: "include",
    });

    if (res.ok) {
      alert("Produit ajouté !");
      setTitle("");
      setDescription("");
      setPrice("");
      setImageUrl("");
    } else {
      alert("Erreur lors de l'ajout du produit");
    }
  }

  if (!session) return <p>Chargement...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard Vendeur</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 w-full" />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 w-full" />
        <input type="number" placeholder="Prix" value={price} onChange={(e) => setPrice(e.target.value)} className="border p-2 w-full" />
        <input placeholder="URL de l'image" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="border p-2 w-full" />
        <button className="bg-black text-white px-4 py-2 w-full">Ajouter le produit</button>
      </form>
    </div>
  );
}
