import Profile from '@/components/profile/profile'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Profile | CakeVille',
}

const ProfilePage = () => {
  return (
    <main>
      <Profile />
    </main>
  )
}

export default ProfilePage