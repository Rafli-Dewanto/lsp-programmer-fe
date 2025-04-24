"use client";

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Cake } from '@/services/cakes/types'
import { formatCurrency } from '@/utils/string'
import { Heart, Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Show from '../show'
import { useCartStore } from '@/store/cart'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';

interface CakeCardProps extends React.ComponentPropsWithoutRef<'div'> {
  cake: Partial<Cake>
}

const CakeCard = (props: CakeCardProps) => {
  const { cake } = props
  const { addItem } = useCartStore()
  const { email } = useAuth();
  const router = useRouter()

  function handleAddToCart(cakeId: number, title: string, price: number) {
    if (!email) {
      router.push("/auth/login?callbackUrl=/shop")
      return
    }
    addItem({
      id: cakeId ?? 0,
      title: title ?? "",
      price: Number(price),
      quantity: 1,
    })
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
        <button className="absolute top-2 right-2 rounded-full bg-white p-1.5 text-pink-800 shadow-sm">
          <Heart className="h-4 w-4" />
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
          onClick={() => handleAddToCart(cake.id as number, cake.title as string, Number(cake.price))}>
          Add to cart
        </Button>
      </CardContent>
    </Card>
  )
}

export default CakeCard