"use client";

import { roles } from '@/constants';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const allowedRoles = roles.map(role => role.value);
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!allowedRoles.includes(role!)) {
      router.push('/auth/login');
    }
    // ignore router
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  if (!allowedRoles.includes(role!)) return null;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6">
          {children}
        </div>
      </div>
    </div>
  );
}