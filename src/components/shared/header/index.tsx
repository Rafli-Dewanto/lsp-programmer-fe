"use client"

import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants'
import { useAuth } from '@/contexts/auth-context'
import { useMediaQuery } from '@/hooks/use-media-query'
import { useCarts } from '@/services/cart/queries/use-carts'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Show from '../show'
import MobileNavigation from './mobile-nav'
import RightHeader from './right-header'

const Header = () => {
  const pathname = usePathname()
  const mobile = useMediaQuery('(max-width: 1324px)')
  const { email, role, logout } = useAuth()
  const { data: carts } = useCarts();
  const totalItems = carts?.data?.reduce((acc, item) => acc + item.quantity, 0);

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
            <Link href={ROUTES.RESERVATION} className={linkClasses('/reservations')}>Reservations</Link>
            <Link href={ROUTES.CART} className="hidden sm:flex items-center">
              <Button variant="outline" size="sm" className="border-pink-200 hover:bg-pink-50 hover:text-pink-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <Show when={(totalItems ?? 0) > 0}>
                  <span className="ml-1 bg-pink-600 text-white rounded-full px-2 py-0.5 text-xs">
                    {totalItems}
                  </span>
                </Show>
              </Button>
            </Link>
          </nav>
          <RightHeader />
        </Show>
        <Show when={mobile}>
          <MobileNavigation
            totalItems={totalItems}
            email={email ?? ''}
            role={role ?? ''}
            pathname={pathname}
            logout={logout}
          />
        </Show>
      </div>
    </header>
  )
}

export default Header