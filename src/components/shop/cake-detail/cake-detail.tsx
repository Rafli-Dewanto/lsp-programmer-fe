"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cart";
import { formatCurrency } from "@/utils/string";
import { Heart, Minus, Plus, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Badge } from "@/components/ui/badge";
import { useCake } from "@/services/cakes/queries/use-cakes";
import Show from "@/components/shared/show";

type CakeDetailProps = {
  id: string;
}

export default function CakeDetail(props: CakeDetailProps) {
  const { id } = props;
  const router = useRouter();
  const { email } = useAuth();
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  const { data: cake, isLoading, error } = useCake(Number(id));

  const handleQuantityChange = (value: number) => {
    if (value >= 1) setQuantity(value);
  };

  const handleAddToCart = () => {
    if (!email) {
      router.push("/auth/login?callbackUrl=/shop");
      return;
    }
    if (cake?.data) {
      addItem({
        id: cake.data.id,
        title: cake.data.title,
        price: cake.data.price,
        quantity: quantity,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container py-8 flex justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (error || !cake) {
    return (
      <div className="container py-8 flex justify-center">
        <p className="text-red-500">Error loading cake details.</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Card className="overflow-hidden">
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8 p-6">
            <div className="relative aspect-square">
              <Image
                src={cake.data?.image || "https://unsplash.com/photos/a-chocolate-cake-with-chocolate-frosting-OSSkMJYU8Wc"}
                alt={cake.data?.title || "Cake"}
                fill
                className="object-cover rounded-lg"
              />
              <button className="absolute top-4 right-4 rounded-full bg-white p-2 text-pink-800 shadow-sm">
                <Heart className="h-5 w-5" />
              </button>
              <Show when={Boolean(cake?.data?.category)}>
                <Badge className="absolute top-4 left-4 bg-pink-600 hover:bg-pink-700">
                  {cake!.data!.category!.split("_")[0].charAt(0).toUpperCase() + cake!.data!.category!.split("_")[0].slice(1)}
                </Badge>
              </Show>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-pink-800 mb-2">{cake.data?.title}</h1>
                <p className="text-muted-foreground">{cake.data?.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{cake.data?.rating}</span>
              </div>

              <div className="text-2xl font-bold text-pink-800">
                {formatCurrency(cake.data?.price ?? 9999999, "id-ID")}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(Number(e.target.value))}
                    className="w-20 text-center"
                    min={1}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  className="w-full bg-pink-600 hover:bg-pink-700 text-lg py-6"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div >
  );
}