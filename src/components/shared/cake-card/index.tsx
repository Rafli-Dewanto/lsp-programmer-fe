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

type CakeCardProps = {
  cake: Partial<Cake>
}

const CakeCard = (props: CakeCardProps) => {
  const { cake } = props
  const { addItem } = useCartStore()

  return (
    <Card key={cake.id} className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-[200px]">
        <Image
          src={cake.image_url || "https://unsplash.com/photos/a-chocolate-cake-with-chocolate-frosting-OSSkMJYU8Wc"}
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
        <Button onClick={() => addItem({
          id: cake.id ?? 0,
          title: cake.title ?? "",
          price: Number(cake.price),
          quantity: 1,
        })} className="w-full bg-pink-600 hover:bg-pink-700">Add to Cart</Button>
      </CardContent>
    </Card>
  )
}

export default CakeCard