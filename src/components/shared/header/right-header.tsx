"use client"

import AdminNavigation from '@/components/admin/admin-navigation'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from '@/contexts/auth-context'
import { ChevronDown, HeartPulse, LogOut, User } from "lucide-react"
import Link from 'next/link'
import Show from '../show'

export default function ProfileDropdown() {
  const { email, role, logout } = useAuth()

  // If not logged in, show sign-in button
  if (!email) {
    return (
      <Link href="/auth/login" className="hidden sm:block">
        <Button variant="outline" size="sm" className="border-pink-200 hover:bg-pink-50 hover:text-pink-600">
          Sign in
        </Button>
      </Link>
    )
  }

  // If logged in, show dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="border-pink-200 hover:bg-pink-50 hover:text-pink-600 flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="max-w-[150px] truncate">{email}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={'/profile'}>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          <Link href={'/wishlist'}>
            <DropdownMenuItem>
              <HeartPulse className="mr-2 h-4 w-4" />
              <span>Wishlist</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <Show when={["admin", "kitchen_staff", "waitress", "cashier"].includes(role as string)}>
          <DropdownMenuSeparator />
          <div className="py-4">
            <h3 className="text-sm font-semibold text-pink-700 flex items-center gap-2 px-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
              Admin Panel
            </h3>
            <AdminNavigation />
          </div>
        </Show>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-pink-600 focus:text-pink-700 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}