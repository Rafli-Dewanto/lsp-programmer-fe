import AdminNavigation from "@/components/admin/admin-navigation"
import Show from "../show"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingBag, User, LogOut, Home, Store, Info, Package, Calendar } from "lucide-react"
import Image from "next/image"
import { ROUTES } from "@/constants"
import Link from "next/link"

type MobileNavigationProps = {
  totalItems?: number
  email?: string
  role?: string
  pathname: string
  logout: () => void
}

const navigationItems = [
  { href: ROUTES.HOME, label: 'Home', icon: Home, path: '/' },
  { href: ROUTES.SHOP, label: 'Shop', icon: Store, path: '/shop' },
  { href: ROUTES.ABOUT, label: 'About', icon: Info, path: '/about' },
  { href: ROUTES.ORDER, label: 'Orders', icon: Package, path: '/orders' },
  { href: ROUTES.RESERVATION, label: 'Reservations', icon: Calendar, path: '/reservations' },
]

const MobileNavigation = (props: MobileNavigationProps) => {
  const { totalItems, email, role, pathname, logout } = props

  const isActive = (path: string) => pathname === path

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-pink-50 text-pink-600 transition-colors duration-200"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="border-l border-pink-100 bg-gradient-to-b from-white to-pink-50/30 overflow-y-auto w-80"
        title='Menu'
        side="right"
      >
        <SheetTitle>
          <div className="flex items-center gap-3 px-4 py-6 border-b border-pink-100/50">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg">
              <Image
                src={'/assets/strawberry-cake.svg'}
                width={24}
                height={24}
                alt="CakeVille"
                priority
                quality={100}
                className="filter brightness-0 invert"
              />
            </div>
            <div>
              <p className="font-bold text-2xl bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent">
                CakeVille
              </p>
              <p className="text-xs text-gray-500 font-normal">Sweet Delights Await</p>
            </div>
          </div>
        </SheetTitle>

        <nav className="flex flex-col gap-2 mt-6 px-4">
          {/* Main Navigation */}
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-200 group
                    ${isActive(item.path)
                      ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg shadow-pink-500/25'
                      : 'hover:bg-pink-50 hover:text-pink-600 text-gray-700'
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 ${isActive(item.path) ? 'text-white' : 'text-pink-500'}`} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-pink-100"></div>

          {/* Cart Section */}
          <Link href={ROUTES.CART} className="block">
            <Button
              variant="outline"
              className="w-full flex items-center justify-between gap-3 py-3 px-4 h-auto border-pink-200 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-300 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-pink-500" />
                <span className="font-medium">Shopping Cart</span>
              </div>
              <Show when={(totalItems ?? 0) > 0}>
                <span className="bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm">
                  {totalItems}
                </span>
              </Show>
            </Button>
          </Link>

          {/* User Section */}
          <div className="mt-6 space-y-3">
            <Show when={!!email} fallback={(
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="w-full border-pink-200 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-300 transition-all duration-200"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign in
                </Button>
              </Link>
            )}>
              <div className="space-y-3">
                {/* Profile Card */}
                <div className="bg-gradient-to-r from-pink-50 to-pink-100/50 rounded-xl p-4 border border-pink-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 truncate">{email}</p>
                      <p className="text-sm text-pink-600 font-medium capitalize">{role || 'Customer'}</p>
                    </div>
                  </div>

                  {/* Profile Link */}
                  <Link href="/profile">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`
                        w-full justify-start gap-2 transition-all duration-200
                        ${pathname === '/profile'
                          ? 'bg-pink-200 text-pink-700 font-medium'
                          : 'hover:bg-pink-200/50 hover:text-pink-700'
                        }
                      `}
                    >
                      <User className="h-4 w-4" />
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </Show>
          </div>

          {/* Admin Section */}
          <Show when={["admin", "kitchen_staff", "waitress", "cashier"].includes(role as string)}>
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
              <h3 className="text-sm font-semibold text-pink-700 mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                Admin Panel
              </h3>
              <AdminNavigation />
            </div>
          </Show>

          {/* Logout Button */}
          <Show when={!!email}>
            <Button
              onClick={logout}
              variant="ghost"
              className="mt-6 mb-8 w-full bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 transition-all duration-200 group"
            >
              <LogOut className="h-4 w-4 mr-2 group-hover:text-red-500" />
              Sign Out
            </Button>
          </Show>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNavigation