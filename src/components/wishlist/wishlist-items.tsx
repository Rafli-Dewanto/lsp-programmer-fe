"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRemoveWishlist } from "@/services/wishlist/mutations/use-remove-wislist";
import { useWishlist } from "@/services/wishlist/queries/use-wishlist";
import { formatCurrency } from "@/utils/string";
import { X } from "lucide-react";
import Image from "next/image";

export default function WishlistItems() {
  const { data: wishlist, isLoading, isSuccess } = useWishlist();
  const removeWishlistMutation = useRemoveWishlist();

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
        <Card
          key={item.id}
          className="overflow-hidden border border-gray-100 rounded-2xl hover:shadow-md transition-all duration-200"
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 bg-pink-50 rounded-lg overflow-hidden">
                <Image
                  src={item.image || "https://unsplash.com/photos/a-chocolate-cake-with-chocolate-frosting-OSSkMJYU8Wc"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500">{formatCurrency(item.price, "id-ID")}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-pink-600 transition-colors"
                onClick={() => removeWishlistMutation.mutate(item.id)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}