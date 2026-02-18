import { prisma } from "@/lib/prisma";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    include: { seller: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#F5F2ED" }}
    >
     

      <section className="text-center py-16 px-6">
        <h1
          className="text-4xl font-bold mb-4"
          style={{ color: "#102820" }}
        >
          Shop Handmade Products
        </h1>

        <p
          className="max-w-xl mx-auto text-lg"
          style={{ color: "#4C6444" }}
        >
          Discover unique creations crafted by talented sellers around you.
        </p>
      </section>

    
      <main className="flex-1 px-6 pb-16 max-w-6xl mx-auto w-full">
        {products.length === 0 ? (
          <p className="text-center" style={{ color: "#4C6444" }}>
            No products available yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-xl shadow-md p-5 transition hover:shadow-xl hover:-translate-y-1"
                style={{ backgroundColor: "#FFFFFF" }}
              >
             
                <div
                  className="h-44 rounded-lg mb-4 flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: "#CABA9C" }}
                >
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span style={{ color: "#402E1A" }}>No image</span>
                  )}
                </div>

            
                <h2
                  className="text-lg font-semibold mb-1"
                  style={{ color: "#102820" }}
                >
                  {product.name}
                </h2>

              
                <p
                  className="text-sm mb-2 line-clamp-2"
                  style={{ color: "#4C6444" }}
                >
                  {product.description}
                </p>

             
                <p className="text-xs mb-3" style={{ color: "#8A6240" }}>
                  By {product.seller.name}
                </p>

         
                <p
                  className="font-bold text-lg mb-4"
                  style={{ color: "#102820" }}
                >
                  ${product.price}
                </p>

            
                <Link
                  href={`/products/${product.id}`}
                  className="block text-center py-2 rounded-md font-semibold transition hover:opacity-90"
                  style={{ backgroundColor: "#102820", color: "#F5F2ED" }}
                >
                  View Product
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>

 
    </div>
  );
}
