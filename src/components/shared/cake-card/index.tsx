import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Cake } from '@/services/cakes/types'
import { formatCurrency } from '@/utils/string'
import { Heart, Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type CakeCardProps = {
  cake: Partial<Cake>
}

const CakeCard = (props: CakeCardProps) => {
  const { cake } = props

  return (
    <Card key={cake.id} className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-[200px]">
        <Image
          src={`/placeholder.svg?height=400&width=400&text=${cake.title}`}
          alt={cake.title!}
          fill
          className="object-cover"
        />
        <button className="absolute top-2 right-2 rounded-full bg-white p-1.5 text-pink-800 shadow-sm">
          <Heart className="h-4 w-4" />
        </button>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{cake.title}</h3>
          <p className="font-bold text-pink-800">{formatCurrency(cake.price ?? 0, 'id-ID')}</p>
        </div>
        <div className="mt-2 flex items-center">
          {Array(cake.rating).fill(0).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
          ))}
          <span className="ml-2 text-xs text-muted-foreground">({Math.floor(Math.random() * 50) + 10} reviews)</span>
        </div>
        <Button className="mt-4 w-full bg-pink-600 hover:bg-pink-700">
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  )
}

export default CakeCard