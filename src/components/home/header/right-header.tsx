"use client";

import Show from '@/components/shared/show';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import Link from 'next/link';

const RightHeader = () => {
  const { email, logout } = useAuth();

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
      <Show when={!!email}>
        <Button onClick={logout} size="sm" className="bg-pink-600 hover:bg-pink-700">
          Log out
        </Button>
      </Show>
    </div>
  )
}

export default RightHeader