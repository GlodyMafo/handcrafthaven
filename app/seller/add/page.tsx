"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, price, imageUrl }),
      credentials: "include", // ← important !
    });

    if (res.ok) {
      alert("Produit ajouté 🎉");
      setTitle("");
      setDescription("");
      setPrice("");
      setImageUrl("");
    } else {
      alert("Erreur lors de l'ajout");
    }
  }

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Ajouter un produit</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="border p-2 w-full"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          className="border p-2 w-full"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="URL de l'image"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button className="bg-black text-white px-4 py-2 w-full">
          Ajouter le produit
        </button>
      </form>
    </div>
  );
}
