"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCakes } from "@/services/cakes/queries/use-cakes"
import { cakeCategory } from "@/services/cakes/types"
import { Filter, Search, X } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import CakeCard from "../shared/cake-card"
import Link from "next/link"

export default function ShopPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Parse search params with defaults
  const page = Number(searchParams.get("page") || "1")
  const title = searchParams.get("title") || ""
  // const price = Number(searchParams.get("price") || "100_000")
  const category = (searchParams.get("category")) as cakeCategory | ""

  // Local state for form inputs
  const [searchTitle, setSearchTitle] = useState(title)
  // const [searchPrice, setSearchPrice] = useState(price || 100_000)
  const [searchCategory, setSearchCategory] = useState(category)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Fetch cakes with current params
  const { data, isLoading, error } = useCakes({
    page,
    title,
    // price,
    category,
  })

  // Update URL with filters
  const updateFilters = () => {
    const params = new URLSearchParams()
    if (searchTitle) params.set("title", searchTitle)
    // if (searchPrice > 0) params.set("price", searchPrice.toString())
    if (searchCategory) params.set("category", searchCategory)
    params.set("page", "1") // Reset to first page on filter change
    router.push(`${pathname}?${params.toString()}`)
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchTitle("")
    setSearchCategory("")
    router.push(pathname)
  }

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", newPage.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Shop Header */}
        <section className="bg-pink-50 py-8 md:py-12">
          <div className="container px-4">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-pink-800 mb-4">Our Delicious Cakes</h1>
              <p className="text-muted-foreground max-w-[600px] mb-6">
                Browse our selection of handcrafted cakes for every occasion, made with the finest ingredients
              </p>

              {/* Desktop Search Bar */}
              <div className="w-full max-w-xl relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for cakes..."
                  className="pl-10 pr-10"
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && updateFilters()}
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  onClick={updateFilters}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Shop Content */}
        <section className="py-8">
          <div className="container px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Desktop Filters Sidebar */}
              <div className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-24 space-y-6">
                  <div>
                    <h3 className="font-medium text-lg mb-4">Filters</h3>
                    <Button variant="outline" size="sm" className="mb-4 text-muted-foreground" onClick={clearFilters}>
                      <X className="mr-2 h-4 w-4" />
                      Clear filters
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="desktop-category" className="text-base mb-2 block">
                        Category
                      </Label>
                      <Select value={searchCategory} onValueChange={(value: cakeCategory | "") => setSearchCategory(value)}>
                        <SelectTrigger id="desktop-category">
                          <SelectValue placeholder="All categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All categories</SelectItem>
                          <SelectItem value="birthday_cake">Birthday</SelectItem>
                          <SelectItem value="wedding_cake">Wedding</SelectItem>
                          <SelectItem value="custom_cake">Custom</SelectItem>
                          <SelectItem value="cup_cake">Cupcakes</SelectItem>
                          <SelectItem value="seasonal_cake">Seasonal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full bg-pink-600 hover:bg-pink-700" onClick={updateFilters}>
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mobile Filters */}
              <div className="lg:hidden flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Filters
                        {(title || category) && (
                          <Badge className="ml-1 bg-pink-600 hover:bg-pink-700">
                            {(title ? 1 : 0) + (category ? 1 : 0)}
                          </Badge>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                        <SheetDescription>Filter cakes by category, and more</SheetDescription>
                      </SheetHeader>
                      <div className="py-6 space-y-6">
                        <div className="space-y-4">
                          <Label htmlFor="mobile-search" className="text-base">
                            Search
                          </Label>
                          <Input
                            id="mobile-search"
                            placeholder="Search cakes..."
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                          />
                        </div>

                        <div className="space-y-4">
                          <Label htmlFor="mobile-category" className="text-base">
                            Category
                          </Label>
                          <Select value={searchCategory} onValueChange={(value: cakeCategory | "") => setSearchCategory(value)}>
                            <SelectTrigger id="mobile-category">
                              <SelectValue placeholder="All categories" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All categories</SelectItem>
                              <SelectItem value="birthday_cake">Birthday</SelectItem>
                              <SelectItem value="wedding_cake">Wedding</SelectItem>
                              <SelectItem value="custom_cake">Custom</SelectItem>
                              <SelectItem value="cup_cake">Cupcakes</SelectItem>
                              <SelectItem value="seasonal_cake">Seasonal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* <div className="space-y-4">
                          <Label className="text-base">Max Price: IDR {searchPrice}</Label>
                          <Slider
                            value={[searchPrice]}
                            min={0}
                            max={1_000_000}
                            step={1000}
                            onValueChange={(value) => setSearchPrice(value[0])}
                            className="py-4"
                          />
                        </div> */}

                        <div className="flex flex-col gap-2">
                          <SheetClose asChild>
                            <Button className="w-full bg-pink-600 hover:bg-pink-700" onClick={updateFilters}>
                              Apply Filters
                            </Button>
                          </SheetClose>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => {
                              clearFilters()
                              setMobileFiltersOpen(false)
                            }}
                          >
                            Clear Filters
                          </Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Active filters display */}
                  <div className="flex flex-wrap gap-2">
                    {title && (
                      <Badge variant="secondary" className="gap-1 px-2 py-1">
                        Search: {title}
                        <button
                          onClick={() => {
                            setSearchTitle("")
                            const params = new URLSearchParams(searchParams)
                            params.delete("title")
                            router.push(`${pathname}?${params.toString()}`)
                          }}
                          className="ml-1"
                        >
                        </button>
                      </Badge>
                    )}
                    {category && (
                      <Badge variant="secondary" className="gap-1 px-2 py-1">
                        Category: {category.charAt(0).toUpperCase() + category.slice(1)}
                        <button
                          onClick={() => {
                            setSearchCategory("")
                            const params = new URLSearchParams(searchParams)
                            params.delete("category")
                            router.push(`${pathname}?${params.toString()}`)
                          }}
                          className="ml-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {/* {price < 300 && (
                      <Badge variant="secondary" className="gap-1 px-2 py-1">
                        Max: IDR {price}
                        <button
                          onClick={() => {
                            setSearchPrice(100_000)
                            const params = new URLSearchParams(searchParams)
                            params.delete("price")
                            router.push(`${pathname}?${params.toString()}`)
                          }}
                          className="ml-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )} */}
                  </div>
                </div>

                {/* Mobile search button */}
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full md:w-auto"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && updateFilters()}
                  />
                  <Button size="icon" variant="ghost" className="absolute right-0 top-0 h-full" onClick={updateFilters}>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Products Grid */}
              <div className="flex-1">
                {/* Results info */}
                <div className="flex justify-between items-center mb-6">
                  <p className="text-sm text-muted-foreground">
                    {isLoading ? (
                      "Loading cakes..."
                    ) : (
                      <>
                        Showing <span className="font-medium">{data?.data?.length || 0}</span> of{" "}
                        <span className="font-medium">{data?.meta?.total || 0}</span> cakes
                      </>
                    )}
                  </p>
                  <Select defaultValue="featured">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Loading state */}
                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array(8)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="rounded-lg border bg-card text-card-foreground shadow-sm animate-pulse"
                        >
                          <div className="h-[200px] bg-muted rounded-t-lg"></div>
                          <div className="p-4 space-y-3">
                            <div className="h-4 bg-muted rounded w-3/4"></div>
                            <div className="h-3 bg-muted rounded w-1/2"></div>
                            <div className="h-4 bg-muted rounded w-1/4"></div>
                            <div className="h-8 bg-muted rounded w-full mt-4"></div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-red-500 mb-4">Error loading cakes. Please try again.</p>
                    <Button onClick={() => router.refresh()}>Retry</Button>
                  </div>
                ) : data?.data?.length === 0 ? (
                  <div className="text-center py-12 border rounded-lg">
                    <h3 className="text-lg font-medium mb-2">No cakes found</h3>
                    <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms</p>
                    <Button onClick={clearFilters}>Clear all filters</Button>
                  </div>
                ) : (
                  <>
                    {/* Products grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {data?.data?.map((cake) => (
                        <Link key={cake.id} href={`/shop/${cake.id}`}>
                          <CakeCard cake={cake} />
                        </Link>
                      ))}
                    </div>

                    {/* Pagination */}
                    {(data?.meta?.last_page || 0) > 1 && (
                      <Pagination className="mt-8">
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              href="#"
                              onClick={(e) => {
                                e.preventDefault()
                                if (page > 1) handlePageChange(page - 1)
                              }}
                              className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>

                          {Array.from({ length: data?.meta?.last_page || 0 }, (_, i) => i + 1).map((pageNum) => {
                            // Show first page, current page, last page, and pages around current
                            if (
                              pageNum === 1 ||
                              pageNum === data?.meta?.last_page ||
                              (pageNum >= page - 1 && pageNum <= page + 1)
                            ) {
                              return (
                                <PaginationItem key={pageNum}>
                                  <PaginationLink
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handlePageChange(pageNum)
                                    }}
                                    isActive={pageNum === page}
                                  >
                                    {pageNum}
                                  </PaginationLink>
                                </PaginationItem>
                              )
                            }

                            // Show ellipsis for gaps
                            if (
                              (pageNum === 2 && page > 3) ||
                              (pageNum === (data?.meta?.last_page || 0) - 1 && page < (data?.meta?.last_page || 0) - 2)
                            ) {
                              return (
                                <PaginationItem key={pageNum}>
                                  <PaginationEllipsis />
                                </PaginationItem>
                              )
                            }

                            return null
                          })}

                          <PaginationItem>
                            <PaginationNext
                              href="#"
                              onClick={(e) => {
                                e.preventDefault()
                                if (page < (data?.meta?.last_page || 0)) handlePageChange(page + 1)
                              }}
                              className={page >= (data?.meta?.last_page || 0) ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
