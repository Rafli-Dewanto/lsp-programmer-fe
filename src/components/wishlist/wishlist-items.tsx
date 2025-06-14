"use client";

import { useWishlist } from "@/services/wishlist/queries/use-wishlist";
import MenuDetail from "../shop/menu-detail/menu-detail";

export default function WishlistItems() {
  const { data: wishlist, isLoading, isSuccess } = useWishlist();

  if (wishlist?.data?.length === 0 || !wishlist?.data) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Your wishlist is empty.</p>
      </div>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isSuccess) {
    return <p>Error loading wishlist.</p>;
  }

  return (
    <div className="space-y-4">
      {wishlist?.data?.map((item) => (
        <MenuDetail id={item.id.toString()} key={item.id} withControl={false} />
      ))}
    </div>
  );
}