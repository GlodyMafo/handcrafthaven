// "use client"; // ⚠ Important : doit être la première ligne

// import { useState } from "react";
// import { useSession } from "next-auth/react";

// type Review = { id: string; rating: number; comment: string; user: { name: string } };
// type Product = {
//   id: string;
//   title: string;
//   description: string;
//   price: number;
//   imageUrl: string;
//   seller: { name: string };
//   reviews: Review[];
// };

// export default function ProductCard({ product }: { product: Product }) {
//   const { data: session } = useSession();
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");
//   const [reviews, setReviews] = useState(product.reviews);

//   const averageRating =
//     reviews.length === 0
//       ? 0
//       : reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

//   async function handleReview(e: React.FormEvent) {
//     e.preventDefault();
//     if (!session) return;

//     const res = await fetch("/api/reviews", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ productId: product.id, rating, comment }),
//     });

//     if (res.ok) {
//       const newReview = await res.json();
//       setReviews([...reviews, newReview]);
//       setComment("");
//       setRating(5);
//     } else {
//       const error = await res.json();
//       alert(error.error);
//     }
//   }

//   return (
//     <div className="border rounded-lg p-4 shadow-sm bg-white">
//       <img
//         src={product.imageUrl}
//         alt={product.title}
//         className="w-full h-48 object-cover rounded-md mb-3"
//       />
//       <h2 className="text-xl font-semibold">{product.title}</h2>
//       <p className="text-gray-600 text-sm mt-1">par {product.seller.name}</p>
//       <p className="mt-2 text-sm">{product.description}</p>
//       <p className="mt-3 font-bold text-lg">{product.price.toFixed(2)} $</p>

//       <p className="mt-2">⭐ Note moyenne : {averageRating.toFixed(1)}</p>

//       <div className="mt-3">
//         {reviews.map((r) => (
//           <div key={r.id} className="border-t py-1">
//             <p>⭐ {r.rating} - {r.user.name}</p>
//             <p className="text-sm">{r.comment}</p>
//           </div>
//         ))}
//       </div>

//       {session && session.user.role === "USER" && (
//         <form onSubmit={handleReview} className="mt-3 space-y-2">
//           <select
//             className="border p-1"
//             value={rating}
//             onChange={(e) => setRating(parseInt(e.target.value))}
//           >
//             {[1, 2, 3, 4, 5].map((n) => (
//               <option key={n} value={n}>{n}</option>
//             ))}
//           </select>
//           <textarea
//             className="border p-2 w-full"
//             placeholder="Votre avis"
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//           />
//           <button className="bg-black text-white px-4 py-2 w-full">Envoyer</button>
//         </form>
//       )}
//     </div>
//   );
// }
