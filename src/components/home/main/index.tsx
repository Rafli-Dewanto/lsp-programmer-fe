"use client";

import React, { useEffect, useRef } from 'react'
import Hero from '../hero'
import Featured from '../featured'
import Testimonials from '../testimonials'
import { useAuthorize } from '@/services/auth/mutations/use-auth';
import { LS_TOKEN } from '@/constants';
// import { useRouter } from 'next/navigation';

const MainPage = () => {
  const authorizeMutation = useAuthorize();
  // const router = useRouter();
  const isFetched = useRef(false);


  useEffect(() => {
    if (isFetched.current) return;
    isFetched.current = true;
    authorizeMutation.mutate(undefined, {
      onError: () => {
        localStorage.removeItem(LS_TOKEN);
      },
    });
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