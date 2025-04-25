import WishlistItems from "@/components/wishlist/wishlist-items";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist | CakeVille Bakery",
  description: "View your saved cakes in the wishlist.",
};

const WishlistPage = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Your Wishlist</h1>
      <WishlistItems />
    </div>
  );
};

export default WishlistPage;