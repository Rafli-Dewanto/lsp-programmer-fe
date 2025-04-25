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

  if (wishlist?.data?.length === 0) {
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
        <Card key={item.id}>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24">
                <Image
                  src={item.image || "https://unsplash.com/photos/a-chocolate-cake-with-chocolate-frosting-OSSkMJYU8Wc"}
                  alt={item.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-pink-800">{item.title}</h3>
                <p className="text-muted-foreground">{formatCurrency(item.price, "id-ID")}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-pink-800"
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