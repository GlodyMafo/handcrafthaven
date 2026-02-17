import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    include: { seller: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Handcraft Product</h1>

      {products.length === 0 && (
        <p>No product to show.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-48 object-cover rounded-md mb-3"
            />

            <h2 className="text-xl font-semibold">{product.title}</h2>

            <p className="text-gray-600 text-sm mt-1">
              par {product.seller.name}
            </p>

            <p className="mt-2 text-sm">{product.description}</p>

            <p className="mt-3 font-bold text-lg">
              {product.price.toFixed(2)} $
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
