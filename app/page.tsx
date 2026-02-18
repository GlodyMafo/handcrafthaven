import { prisma } from "@/lib/prisma";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    include: { seller: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F5F2ED" }}>


      {/* HERO SECTION */}
      <section
        className="flex flex-col items-center justify-center text-center py-20 px-6"
        style={{ backgroundColor: "#102820", color: "#F5F2ED" }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover Handmade Treasures
        </h1>
        <p className="max-w-xl text-lg opacity-90 mb-6">
          Unique products crafted with passion by talented sellers.  
          Support creativity and shop something truly special.
        </p>

        <Link
          href="#products"
          className="px-6 py-3 rounded-md font-semibold transition hover:opacity-90"
          style={{ backgroundColor: "#8A6240", color: "#F5F2ED" }}
        >
          Shop Now
        </Link>
      </section>

      {/* PRODUCTS SECTION */}
      <main id="products" className="flex-1 px-6 py-16 max-w-6xl mx-auto w-full">
        <h2
          className="text-3xl font-bold mb-10 text-center"
          style={{ color: "#402E1A" }}
        >
          Latest Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-xl shadow-md p-5 transition hover:shadow-xl hover:-translate-y-1"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              {/* IMAGE PLACEHOLDER */}
              <div className="h-40 rounded-lg mb-4 flex items-center justify-center"
                   style={{ backgroundColor: "#CABA9C" }}>
                <span className="text-sm" style={{ color: "#402E1A" }}>
                  Product Image
                </span>
              </div>

              <h3 className="text-lg font-semibold mb-1" style={{ color: "#102820" }}>
                {product.name}
              </h3>

              <p className="text-sm mb-2 line-clamp-2" style={{ color: "#4C6444" }}>
                {product.description}
              </p>

              <p className="text-xs mb-4" style={{ color: "#8A6240" }}>
                Seller: {product.seller.name}
              </p>

              <button
                className="w-full py-2 rounded-md font-semibold transition hover:opacity-90"
                style={{ backgroundColor: "#102820", color: "#F5F2ED" }}
              >
                View Product
              </button>
            </div>
          ))}
        </div>
      </main>


    </div>
  );
}
