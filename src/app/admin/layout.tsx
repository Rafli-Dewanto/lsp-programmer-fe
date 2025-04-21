"use client";

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (role !== 'admin') {
      router.push('/auth/login');
    }
  }, [role, router]);

  if (role !== 'admin') return null;

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