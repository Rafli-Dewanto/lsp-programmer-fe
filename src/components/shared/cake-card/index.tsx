"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth-context';
import { Menu } from '@/services/menus/types';
import { useAddCart } from '@/services/cart/mutations/use-add-cart';
import { useAddWishlist } from '@/services/wishlist/mutations/use-add-wishlist';
import { useRemoveWishlist } from '@/services/wishlist/mutations/use-remove-wislist';
import { useWishlist } from '@/services/wishlist/queries/use-wishlist';
import { formatCurrency } from '@/utils/string';
import { Heart, Star } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import Show from '../show';

interface CakeCardProps extends React.ComponentPropsWithoutRef<'div'> {
  cake: Partial<Menu>
}

const CakeCard = (props: CakeCardProps) => {
  const { cake } = props
  const addToCartMutation = useAddCart();
  const { email } = useAuth();
  const router = useRouter()
  const { data: wishlist } = useWishlist();
  const addToWishlist = useAddWishlist();
  const removeFromWishlist = useRemoveWishlist();

  const isInWishlist = wishlist?.data?.some((item) => item.id === cake.id);

  const handleWishlistClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist.mutate(cake.id ?? 0);
    } else {
      addToWishlist.mutate(cake.id ?? 0);
    }
  };


  function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>, cakeId: number) {
    e.preventDefault()
    e.stopPropagation()
    if (!email) {
      router.push("/auth/login?callbackUrl=/shop")
      return
    }
    addToCartMutation.mutate({
      menu_id: cakeId,
      quantity: 1,
    });
  }

  return (
    <Card key={cake.id} className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-[200px]">
        <Image
          src={cake.image || "https://unsplash.com/photos/a-chocolate-cake-with-chocolate-frosting-OSSkMJYU8Wc"}
          alt={cake.title || ""}
          fill
          className="object-cover"
        />
        <button
          onClick={(e) => handleWishlistClick(e)}
          className="absolute top-2 right-2 rounded-full bg-white p-1.5 text-pink-800 shadow-sm cursor-pointer">
          <Show when={isInWishlist ?? false} fallback={<Heart className="h-4 w-4" />}>
            <Heart className="h-4 w-4 fill-pink-800" />
          </Show>
        </button>
        <Show when={!!cake?.category}>
          <Badge className="absolute top-2 left-2 bg-pink-600 hover:bg-pink-700">
            {cake?.category ? cake.category.split("_")[0].charAt(0).toUpperCase() + cake.category.split("_")[0].slice(1) : ''}
          </Badge>
        </Show>
      </div>
      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="font-medium line-clamp-1">{cake.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1">{cake.description}</p>
        </div>
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{cake.rating}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="font-bold text-pink-800">{formatCurrency(Number((cake?.price?.toFixed(2) ?? 0)), "id-ID")}</p>
        </div>
        <Button
          className="w-full bg-pink-600 hover:bg-pink-700"
          onClick={(e) => handleAddToCart(e, cake.id as number)}>
          Add to cart
        </Button>
      </CardContent>
    </Card >
  )
}

export default CakeCard