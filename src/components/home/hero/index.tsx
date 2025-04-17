import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section className="relative px-8">
      <div className="container px-4 py-16 md:py-24 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-pink-800">
              Handcrafted Cakes for Every Occasion
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Indulge in our delicious, made-from-scratch cakes and pastries.
              Using only the finest ingredients for that perfect sweet moment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
                Shop Now
              </Button>
              <Link href={ROUTES.ABOUT + "#our-story"}>
                <Button variant="outline" size="lg" className="border-pink-200 hover:bg-pink-50">
                  Our Story <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1604413191066-4dd20bedf486?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGNha2VzfGVufDB8fDB8fHww"
              alt="Beautifully decorated cake"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero