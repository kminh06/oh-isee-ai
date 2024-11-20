'use client'

import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useClerk, UserButton, UserProfile } from '@clerk/nextjs'
import { useAuth } from '@clerk/nextjs'

export default function Header() {
  const { theme } = useTheme()
  const { openSignIn } = useClerk()
  const { isSignedIn } = useAuth()

  return (
    <header className='border-b dark:border-gray-800 px-4 sm:px-8'>
      <div className='flex items-center justify-between max-w-[1600px] mx-auto h-16'>
        <Link href='/' className='flex items-center gap-2'>
          <img
            src={
              theme === 'dark' ? '/logo-full/Dark.svg' : '/logo-full/Light.svg'
            }
            alt='logo'
            className='h-6 sm:h-8'
          />
        </Link>
        <div className='flex items-center gap-4'>
          {/* <ThemeToggle /> */}
          {/* <a href='/sign-in'> */}
          {/* <Button
            variant='outline'
            onClick={() => {
              openSignIn()
            }}
            className='gap-2'
          >
            Đăng nhập
          </Button> */}
          {/* </a> */}
          {isSignedIn ? (
            <UserButton />
          ) : (
            <a href='/sign-in'>
              <Button variant={'outline'}>Đăng nhập</Button>
            </a>
          )}
        </div>
      </div>
    </header>
  )
}
