"use client";

import { useAuth } from '@/contexts/auth-context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import Show from '../shared/show';
import { Edit, ShoppingBag } from 'lucide-react';

const AdminNavigation = () => {
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (role !== 'admin') {
      router.push('/auth/login');
    }
  }, [role, router]);

  if (role !== 'admin') return null;

  return (
    <Show when={role === 'admin'}>
      <Link
        className="flex items-center gap-2 px-2.5 py-1.5 text-white bg-pink-600 rounded-lg shadow hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
        href="/admin"
      >
        <Edit className="w-5 h-5" />
        <span>Manage Products</span>
      </Link>
      <Link
        className="flex items-center gap-2 px-2.5 py-1.5 text-white bg-pink-600 rounded-lg shadow hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
        href="/admin/orders"
      >
        <ShoppingBag className="w-5 h-5" />
        <span>Customer&apos;s Orders</span>
      </Link>
    </Show>
  )
}

export default AdminNavigation