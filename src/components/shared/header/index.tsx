"use client"

import AdminNavigation from '@/components/admin/admin-navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ROUTES } from '@/constants'
import { useAuth } from '@/contexts/auth-context'
import { useMediaQuery } from '@/hooks/use-media-query'
import { useCartStore } from '@/store/cart'
import { Menu, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Show from '../show'
import RightHeader from './right-header'

const Header = () => {
  const pathname = usePathname()
  const mobile = useMediaQuery('(max-width: 1324px)')
  const { email, role, logout } = useAuth()
  const { items } = useCartStore();

  const linkClasses = (href: string) =>
    pathname === href
      ? 'text-pink-600 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-pink-600 after:rounded-full'
      : 'text-gray-600 hover:text-pink-600 transition-colors relative hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-pink-600 hover:after:rounded-full after:transition-all'

  return (
    <header className="px-4 md:px-8 sticky top-0 z-50 w-full border-b border-pink-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between mx-auto">
        <div className="flex items-center gap-2">
          <Link href={ROUTES.HOME} className="font-bold relative bg-red-200 text-2xl text-pink-600 flex items-center gap-4 space-x-5">
            <div className='h-7 w-7 fill-pink-600 stroke-white absolute top-1/2 -translate-y-1/2 left-0'>
              <Image
                src={'/assets/strawberry-cake.svg'}
                fill
                alt="CakeVille"
                priority
                quality={100}
              />
            </div>
            <div className="bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent absolute left-8">CakeVille</div>
          </Link>
        </div>

        <Show when={!mobile}>
          <nav className="hidden md:flex gap-8 items-center">
            <Link href={ROUTES.HOME} className={linkClasses('/')}>Home</Link>
            <Link href={ROUTES.SHOP} className={linkClasses('/shop')}>Shop</Link>
            <Link href={ROUTES.ABOUT} className={linkClasses('/about')}>About</Link>
            <Link href={ROUTES.ORDER} className={linkClasses('/orders')}>Orders</Link>
            <Link href={ROUTES.CART} className="hidden sm:flex items-center">
              <Button variant="outline" size="sm" className="border-pink-200 hover:bg-pink-50 hover:text-pink-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {items.length > 0 && (
                  <span className="ml-1 bg-pink-600 text-white rounded-full px-2 py-0.5 text-xs">
                    {items.length}
                  </span>
                )}
              </Button>
            </Link>
          </nav>
          <RightHeader />
        </Show>
        <Show when={mobile}>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-pink-50 text-pink-600">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="border-l border-pink-100 bg-white" title='Menu' side="right">
              <SheetTitle>
                <div className="flex items-center gap-y-4 gap-x-2 px-2 py-4 border-b border-pink-100">
                  <Image
                    src={'/assets/strawberry-cake.svg'}
                    width={20}
                    height={20}
                    alt="CakeVille"
                    priority
                    quality={100}
                  />
                  <p className="font-bold text-2xl bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent">CakeVille</p>
                </div>
              </SheetTitle>
              <nav className="flex flex-col gap-4 mt-6 container px-2">
                <Link href={ROUTES.HOME} className={`py-2 px-3 rounded-lg ${pathname === '/' ? 'bg-pink-50 text-pink-600 font-medium' : 'hover:bg-pink-50 hover:text-pink-600'}`}>Home</Link>
                <Link href={ROUTES.SHOP} className={`py-2 px-3 rounded-lg ${pathname === '/shop' ? 'bg-pink-50 text-pink-600 font-medium' : 'hover:bg-pink-50 hover:text-pink-600'}`}>Shop</Link>
                <Link href={ROUTES.ABOUT} className={`py-2 px-3 rounded-lg ${pathname === '/about' ? 'bg-pink-50 text-pink-600 font-medium' : 'hover:bg-pink-50 hover:text-pink-600'}`}>About</Link>
                <Link href={ROUTES.ORDER} className={`py-2 px-3 rounded-lg ${pathname === '/orders' ? 'bg-pink-50 text-pink-600 font-medium' : 'hover:bg-pink-50 hover:text-pink-600'}`}>Orders</Link>

                <div className="my-2 border-t border-pink-100"></div>

                <Link href={ROUTES.CART} className="py-2">
                  <Button variant={'outline'} className='w-full flex items-center justify-center gap-2 border-pink-200 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-300'>
                    <ShoppingBag className="h-4 w-4" />
                    <p>Cart</p>
                    <Show when={items.length > 0}>
                      <span className="ml-1 bg-pink-600 text-white rounded-full px-2 py-0.5 text-xs">
                        {items.length}
                      </span>
                    </Show>
                  </Button>
                </Link>

                <div className="mt-4">
                  <Link href="/auth/login">
                    <Show when={!!email} fallback={(
                      <Button variant="outline" size="sm" className="w-full border-pink-200 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-300">
                        Sign in
                      </Button>
                    )}>
                      <div className="flex items-center px-3 py-2 rounded-lg bg-pink-50 text-pink-600">
                        <span className="font-medium">{email}</span>
                      </div>
                    </Show>
                  </Link>
                </div>

                <Show when={role === "admin"}>
                  <div className="mt-2 p-3 rounded-lg bg-pink-50 space-y-4">
                    <h3 className="text-sm font-medium text-pink-600 mb-2">Admin Panel</h3>
                    <AdminNavigation />
                  </div>
                </Show>

                <Show when={!!email}>
                  <Button onClick={logout} size="sm" className="mt-4 w-full bg-pink-900 hover:bg-pink-700 text-white cursor-pointer">
                    Log out
                  </Button>
                </Show>
              </nav>
            </SheetContent>
          </Sheet>
        </Show>
      </div>
    </header>
  )
}

export default Header