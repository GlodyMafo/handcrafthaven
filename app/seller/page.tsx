"use client";

import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    getSession().then(async (sess) => {
      if (!sess || sess.user.role !== "SELLER") {
        router.push("/login");
      } else {
        setSession(sess);
        fetchProducts();
      }
    });
  }, []);

  async function fetchProducts() {
    const res = await fetch("/api/products/mine");
    if (res.ok) {
      const data = await res.json();
      setProducts(data);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price, imageUrl }),
      credentials: "include",
    });

    if (res.ok) {
      setName("");
      setDescription("");
      setPrice("");
      setImageUrl("");
      fetchProducts();
    } else {
      alert("Error adding product");
    }
  }

  if (!session)
    return (
      <p className="text-center mt-20" style={{ color: "#402E1A" }}>
        Loading...
      </p>
    );

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F5F2ED" }}>
      
      {/* SIDEBAR FORM */}
      <aside
        className="w-full md:w-80 p-6 shadow-md"
        style={{ backgroundColor: "#CABA9C" }}
      >
        <h2 className="text-xl font-semibold mb-6" style={{ color: "#402E1A" }}>
          Add Product
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
          
          {/* Name */}
          <div>
            <label className="block text-sm mb-1" style={{ color: "#402E1A" }}>
              Product Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-3 rounded-md w-full"
              style={{ backgroundColor: "#F5F2ED", borderColor: "#4C6444" }}
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm mb-1" style={{ color: "#402E1A" }}>
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border p-3 rounded-md w-full"
              style={{ backgroundColor: "#F5F2ED", borderColor: "#4C6444" }}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm mb-1" style={{ color: "#402E1A" }}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-3 rounded-md w-full"
              style={{ backgroundColor: "#F5F2ED", borderColor: "#4C6444" }}
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm mb-1" style={{ color: "#402E1A" }}>
              Image URL
            </label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="border p-3 rounded-md w-full"
              style={{ backgroundColor: "#F5F2ED", borderColor: "#4C6444" }}
            />
          </div>

          <button
            type="submit"
            className="py-3 rounded-md font-semibold mt-2 transition hover:opacity-90"
            style={{ backgroundColor: "#102820", color: "#F5F2ED" }}
          >
            Add Product
          </button>
        </form>
      </aside>

      {/* PRODUCTS AREA */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8" style={{ color: "#102820" }}>
          Your Products
        </h1>

        {products.length === 0 ? (
          <p style={{ color: "#4C6444" }}>No products yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-xl shadow-md p-4 transition hover:shadow-xl"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                <div
                  className="h-40 rounded-lg mb-3 flex items-center justify-center"
                  style={{ backgroundColor: "#CABA9C" }}
                >
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <span style={{ color: "#402E1A" }}>No image</span>
                  )}
                </div>

                <h3 className="font-semibold text-lg" style={{ color: "#102820" }}>
                  {product.name}
                </h3>

                <p className="text-sm mb-2" style={{ color: "#4C6444" }}>
                  {product.description}
                </p>

                <p className="font-bold" style={{ color: "#8A6240" }}>
                  ${product.price}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
