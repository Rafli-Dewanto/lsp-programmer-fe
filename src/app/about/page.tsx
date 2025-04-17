import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About Us | CakeVille Bakery",
  description: "Learn about our story, our team, and our passion for creating delicious cakes and pastries.",
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-pink-50">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-pink-800 mb-6">
                Our Sweet Story
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                From a small kitchen to a beloved bakery, discover the passion and people behind CakeVille.
              </p>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full">
            <Image
              src="https://images.unsplash.com/photo-1579359652478-bdcba0c995ed?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FrZSUyMHN0b3JlfGVufDB8fDB8fHww"
              alt="Our bakery storefront"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Our Story */}
        <section id="our-story" className="py-16 md:py-24">
          <div className="container px-4 mx-auto">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="inline-block rounded-lg bg-pink-100 px-3 py-1 text-sm text-pink-800 font-medium">
                  Est. 2010
                </div>
                <h2 className="text-3xl font-bold text-pink-800">How It All Began</h2>
                <p className="text-muted-foreground">
                  CakeVille began in 2010 when our founder, Emma Baker, started baking cakes from her home kitchen
                  for friends and family. What started as a hobby quickly turned into a passion as word spread about her
                  delicious creations.
                </p>
                <p className="text-muted-foreground">
                  After overwhelming demand, Emma took a leap of faith and opened our first small bakery in downtown
                  Cakeville. With a commitment to using only the finest ingredients and creating cakes that taste as
                  good as they look, CakeVille quickly became the go-to bakery for special occasions.
                </p>
                <p className="text-muted-foreground">
                  Today, we&apos;ve grown into a beloved local institution with a team of talented bakers and decorators, but
                  our core values remain the same: quality, creativity, and a personal touch in everything we create.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="bg-pink-50 py-16 md:py-24">
          <div className="container px-4 mx-auto">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl font-bold text-pink-800 mb-4">Our Values</h2>
              <p className="text-muted-foreground">
                These core principles guide everything we do, from selecting ingredients to serving our customers
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Quality Ingredients",
                  description:
                    "We use only the finest, freshest ingredients in all our bakes. From Belgian chocolate to locally sourced fruits, quality is never compromised.",
                  icon: "🍰",
                },
                {
                  title: "Handcrafted with Love",
                  description:
                    "Every cake is handmade with attention to detail. We believe that the love and care we put into our baking is what makes our cakes special.",
                  icon: "❤️",
                },
                {
                  title: "Customer Happiness",
                  description:
                    "Your satisfaction is our priority. We work closely with each customer to ensure their cake exceeds expectations for their special occasion.",
                  icon: "😊",
                },
                {
                  title: "Creativity",
                  description:
                    "We love bringing creative ideas to life. Our team is constantly innovating with new flavors, designs, and techniques.",
                  icon: "✨",
                },
                {
                  title: "Community",
                  description:
                    "We&apos;re proud to be part of the Cakeville community and regularly participate in local events and charitable initiatives.",
                  icon: "🏙️",
                },
                {
                  title: "Sustainability",
                  description:
                    "We&apos;re committed to reducing our environmental impact through eco-friendly packaging and responsible sourcing practices.",
                  icon: "🌱",
                },
              ].map((value, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="p-6">
                    <div className="mb-4 text-4xl">{value.icon}</div>
                    <h3 className="text-xl font-bold text-pink-800 mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="bg-pink-50 py-16 md:py-24">
          <div className="container px-4 mx-auto">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl font-bold text-pink-800 mb-4">Our Baking Process</h2>
              <p className="text-muted-foreground">
                From concept to creation, discover how we craft the perfect cake for your special occasion
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "1",
                  title: "Consultation",
                  description:
                    "We start by understanding your vision, occasion, and preferences to create the perfect cake concept.",
                },
                {
                  step: "2",
                  title: "Design",
                  description:
                    "Our designers sketch your cake and finalize details like flavors, fillings, and decorative elements.",
                },
                {
                  step: "3",
                  title: "Baking",
                  description:
                    "Using premium ingredients, we bake your cake from scratch with attention to flavor and texture.",
                },
                {
                  step: "4",
                  title: "Decoration",
                  description:
                    "Our skilled decorators bring the design to life, adding the finishing touches that make each cake special.",
                },
              ].map((process, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-600 text-white font-bold text-xl mb-4">
                      {process.step}
                    </div>
                    <h3 className="text-xl font-bold text-pink-800 mb-2">{process.title}</h3>
                    <p className="text-muted-foreground">{process.description}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-6 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-[2px] bg-pink-200"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16 md:py-24">
          <div className="container px-4 mx-auto">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-pink-100 p-6 text-center">
                  <div className="text-3xl font-bold text-pink-800 mb-2">500+</div>
                  <p className="text-muted-foreground">Wedding Cakes</p>
                </div>
                <div className="rounded-lg bg-pink-100 p-6 text-center">
                  <div className="text-3xl font-bold text-pink-800 mb-2">15k+</div>
                  <p className="text-muted-foreground">Happy Customers</p>
                </div>
                <div className="rounded-lg bg-pink-100 p-6 text-center">
                  <div className="text-3xl font-bold text-pink-800 mb-2">3</div>
                  <p className="text-muted-foreground">Local Awards</p>
                </div>
                <div className="rounded-lg bg-pink-100 p-6 text-center">
                  <div className="text-3xl font-bold text-pink-800 mb-2">12</div>
                  <p className="text-muted-foreground">Years of Sweetness</p>
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <h2 className="text-3xl font-bold text-pink-800">Our Sweet Achievements</h2>
                <p className="text-muted-foreground">
                  We&apos;re proud of the milestones we&apos;ve reached and the trust our customers place in us for their most
                  special occasions.
                </p>
                <p className="text-muted-foreground">
                  From being voted &quot;Best Bakery in Cakeville&quot; three years running to creating cakes for celebrity
                  events, we&apos;ve come a long way from our humble beginnings.
                </p>
                <p className="text-muted-foreground">
                  But our greatest achievement is the smile on our customers&apos; faces when they see and taste our
                  creations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-pink-100 py-16">
          <div className="container px-4 mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-pink-800 mb-4">Ready to Order Your Dream Cake?</h2>
              <p className="text-muted-foreground mb-8">
                Whether it&apos;s a birthday, wedding, or just because, we&apos;d love to create something special for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
                  Order Now
                </Button>
                <Button variant="outline" size="lg" className="border-pink-200 hover:bg-pink-50">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
