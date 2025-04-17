import RightHeader from "@/components/home/header/right-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Facebook, Heart, Instagram, Star, Twitter } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header/Navigation */}
      <header className="px-8 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold text-2xl text-pink-800">Sweet Delights</Link>
          </div>

          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-pink-800 font-medium">Home</Link>
            <Link href="/shop" className="text-muted-foreground hover:text-pink-800 transition-colors">Shop</Link>
            <Link href="/about" className="text-muted-foreground hover:text-pink-800 transition-colors">About</Link>
            <Link href="/contact" className="text-muted-foreground hover:text-pink-800 transition-colors">Contact</Link>
          </nav>
          <RightHeader />
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
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
                  <Button variant="outline" size="lg" className="border-pink-200 hover:bg-pink-50">
                    Our Story <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
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

        {/* Featured Products */}
        <section className="bg-pink-50 py-16">
          <div className="container px-4">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-bold text-pink-800 mb-4">Our Bestsellers</h2>
              <p className="text-muted-foreground max-w-[600px]">
                Discover our most loved cakes that have delighted customers time and time again
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Chocolate Truffle", price: "$42.99", rating: 5 },
                { name: "Strawberry Delight", price: "$38.99", rating: 4 },
                { name: "Vanilla Bean", price: "$35.99", rating: 5 },
                { name: "Red Velvet", price: "$44.99", rating: 5 },
              ].map((cake, index) => (
                <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative h-[200px]">
                    <Image
                      src={`/placeholder.svg?height=400&width=400&text=${cake.name}`}
                      alt={cake.name}
                      fill
                      className="object-cover"
                    />
                    <button className="absolute top-2 right-2 rounded-full bg-white p-1.5 text-pink-800 shadow-sm">
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{cake.name}</h3>
                      <p className="font-bold text-pink-800">{cake.price}</p>
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
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" className="border-pink-200 hover:bg-pink-100">
                View All Cakes <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24">
          <div className="container px-4">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-bold text-pink-800 mb-4">What Our Customers Say</h2>
              <p className="text-muted-foreground max-w-[600px]">
                Don&apos;t just take our word for it - hear from our satisfied customers
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  name: "Sarah Johnson",
                  comment: "The birthday cake was absolutely perfect! Not only was it beautiful, but it tasted amazing. Everyone at the party was impressed.",
                },
                {
                  name: "Michael Chen",
                  comment: "I ordered a custom cake for my wedding anniversary and it exceeded all expectations. The attention to detail was remarkable.",
                },
                {
                  name: "Emily Rodriguez",
                  comment: "Sweet Delights has been my go-to bakery for years. Their cakes are consistently delicious and the service is always friendly.",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex">
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground">{testimonial.comment}</p>
                    <div className="flex items-center gap-4 pt-4">
                      <div className="rounded-full bg-pink-100 p-1">
                        <div className="h-8 w-8 rounded-full bg-pink-200 flex items-center justify-center font-bold text-pink-700">
                          {testimonial.name.split(" ").map(word => word[0]).join("")}
                        </div>
                      </div>
                      <span className="font-medium text-pink-800">{testimonial.name}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-pink-100 py-8">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sweet Delights. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="https://instagram.com" aria-label="Instagram">
              <Instagram className="h-5 w-5 hover:text-pink-800 transition-colors" />
            </Link>
            <Link href="https://facebook.com" aria-label="Facebook">
              <Facebook className="h-5 w-5 hover:text-pink-800 transition-colors" />
            </Link>
            <Link href="https://twitter.com" aria-label="Twitter">
              <Twitter className="h-5 w-5 hover:text-pink-800 transition-colors" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
