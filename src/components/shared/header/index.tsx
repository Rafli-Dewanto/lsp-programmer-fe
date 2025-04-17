"use client"

import Link from 'next/link'
import React from 'react'
import RightHeader from './right-header'
import { usePathname } from 'next/navigation'
import { ROUTES } from '@/constants'

const Header = () => {
  const pathname = usePathname()

  const linkClasses = (href: string) =>
    pathname === href
      ? 'text-pink-800 font-medium'
      : 'text-muted-foreground hover:text-pink-800 transition-colors'

  return (
    <header className="px-8 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto">
        <div className="flex items-center gap-2">
          <Link href={ROUTES.HOME} className="font-bold text-2xl text-pink-800">CakeVille</Link>
        </div>

        <nav className="hidden md:flex gap-6">
          <Link href={ROUTES.HOME} className={linkClasses('/')}>Home</Link>
          <Link href={ROUTES.SHOP} className={linkClasses('/shop')}>Shop</Link>
          <Link href={ROUTES.ABOUT} className={linkClasses('/about')}>About</Link>
          <Link href={ROUTES.ORDER} className={linkClasses('/orders')}>Orders</Link>
        </nav>

        <RightHeader />
      </div>
    </header>
  )
}

export default Header