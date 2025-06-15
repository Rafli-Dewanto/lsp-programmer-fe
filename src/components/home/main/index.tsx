"use client";

import React, { useEffect, useRef } from 'react'
import Hero from '../hero'
import Featured from '../featured'
import Testimonials from '../testimonials'
import { useAuthorize } from '@/services/auth/mutations/use-auth';
import { LS_TOKEN } from '@/constants';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { logger } from '@/utils/logger';

const MainPage = () => {
  const authorizeMutation = useAuthorize();
  const { logout, token } = useAuth();
  const router = useRouter();
  const isFetched = useRef(false);


  useEffect(() => {
    const checkAuth = async () => {
      if (isFetched.current) return;
      isFetched.current = true;
      if (!token) return;

      try {
        await authorizeMutation.mutateAsync(undefined);
      } catch (error) {
        logger.error('Error on fetching token', error);
        logout()
        localStorage.removeItem(LS_TOKEN);
        router.push('/auth/login');
      }
    };

    checkAuth();
  });

  return (
    <main className="flex-1">
      <Hero />
      <Featured />
      <Testimonials />
    </main>
  )
}

export default MainPage