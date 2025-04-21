"use client";

import AdminNavigation from '@/components/admin/admin-navigation';
import Show from '@/components/shared/show';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';
import { useAuth } from '@/contexts/auth-context';
import { useCartStore } from '@/store/cart';
import Link from 'next/link';

const RightHeader = () => {
  const { email, logout, role } = useAuth();
  const { items } = useCartStore();

  return (
    <div className="flex items-center gap-4">
      <Link href="/login" className="hidden sm:block">
        <Show when={!!email} fallback={(
          <Button variant="outline" size="sm" className="border-pink-200 hover:bg-pink-50 hover:text-pink-800">
            Sign in
          </Button>
        )}>
          {email}
        </Show>
      </Link>
      <Show when={role === "admin"}>
        <AdminNavigation />
      </Show>
      <Show when={!!email}>
        <Button onClick={logout} size="sm" className="bg-pink-600 hover:bg-pink-700">
          Log out
        </Button>
        <Link href={ROUTES.CART} className="hidden sm:flex items-center gap-2">
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
      </Show>
    </div>
  )
}

export default RightHeader