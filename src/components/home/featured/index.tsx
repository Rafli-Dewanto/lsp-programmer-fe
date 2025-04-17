import CakeCard from '@/components/shared/cake-card'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

const Featured = () => {
  return (
    <section className="bg-pink-50 py-16">
      <div className="w-full mx-auto px-4 container">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold text-pink-800 mb-4">Our Bestsellers</h2>
          <p className="text-muted-foreground max-w-[600px]">
            Discover our most loved cakes that have delighted customers time and time again
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: 1, title: "Chocolate Truffle", price: 90000, rating: 5 },
            { id: 2, title: "Strawberry Delight", price: 86000, rating: 4 },
            { id: 3, title: "Vanilla Bean", price: 79000, rating: 5 },
            { id: 4, title: "Red Velvet", price: 120000, rating: 5 },
          ].map((cake, index) => (
            <CakeCard cake={cake} key={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="border-pink-200 hover:bg-pink-100">
            View All Cakes <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Featured