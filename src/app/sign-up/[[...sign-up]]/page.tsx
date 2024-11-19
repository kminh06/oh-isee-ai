import Header from '@/components/header'
import { SignupForm } from '@/components/signup-form'
import { SignIn, SignUp } from '@clerk/nextjs'
import { useAuth } from '@clerk/nextjs'
// import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

export default async function Page() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow flex justify-center items-center'>
        <SignupForm />
      </main>
    </div>
  )
}
