import { Card } from '@/components/ui/card'
import { Star } from 'lucide-react'
import React from 'react'

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 mx-auto">
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
              comment: "CakeVille has been my go-to bakery for years. Their cakes are consistently delicious and the service is always friendly.",
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
  )
}

export default Testimonials