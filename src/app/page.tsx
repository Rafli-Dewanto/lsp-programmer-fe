import Featured from "@/components/home/featured"
import Hero from "@/components/home/hero"
import Testimonials from "@/components/home/testimonials"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <Hero />
        <Featured />
        <Testimonials />
      </main>
    </div>
  )
}
