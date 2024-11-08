'use client'

import Chat from '@/components/chat'
import SecondRow from '@/components/second-row'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useTheme } from 'next-themes'
import Link from 'next/link'

export default function Page() {
  const { theme } = useTheme()

  return (
    <div className='flex flex-col min-h-screen'>
      {/* <header className='flex max-w-5xl mx-auto w-full relative justify-center p-4 sm:p-8'>
        <img
          src={
            theme === 'dark' ? '/logo-full/Dark.svg' : '/logo-full/Light.svg'
          }
          alt='logo'
          className='h-8 sm:h-12'
        />
        <div className='absolute flex gap-4 items-center right-4 sm:right-8'>
          <ThemeToggle />
          <a href='/sign-in'>
            <Button variant={'outline'}>Sign in</Button>
          </a>
        </div>
      </header> */}
      <header className='border-b dark:border-gray-800 px-4 sm:px-8'>
        <div className='flex items-center justify-between max-w-[1920px] mx-auto h-16'>
          <Link href='/' className='flex items-center gap-2'>
            <img
              src={
                theme === 'dark'
                  ? '/logo-full/Dark.svg'
                  : '/logo-full/Light.svg'
              }
              alt='logo'
              className='h-6 sm:h-8'
            />
          </Link>
          <div className='flex items-center gap-4'>
            <ThemeToggle />
            <a href='/sign-in'>
              <Button variant='outline' className='gap-2'>
                Đăng nhập
              </Button>
            </a>
          </div>
        </div>
      </header>
      <main className='mt-4 flex-grow w-full px-4 sm:px-8'>
        <div className='max-w-[1920px] mx-auto flex flex-col gap-4'>
          <div className='grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4'>
            <Chat />
            <SecondRow />
          </div>

          <p className='text-center text-slate-700 dark:text-slate-200 leading-relaxed pt-4 p-8 sm:pt-12 sm:p-16 mx-auto text-sm'>
            Oh, i see! là một nền tảng huấn luyện tinh thần và cảm xúc, giúp bạn
            phá vỡ giới hạn tư duy và tìm thấy sự kết nối sâu sắc với bản thân
            và thế giới xung quanh. Với sự hướng dẫn từ các huấn luyện viên
            chuyên nghiệp, Oh, i see! hỗ trợ bạn quản lý căng thẳng, cải thiện
            mối quan hệ, và xây dựng lối sống hạnh phúc. Thử nghiệm phương pháp
            độc đáo này để trải nghiệm sự thay đổi tích cực trong cuộc sống, và
            đừng quên giới thiệu cho bạn bè để cùng nhau phát triển!
          </p>
        </div>
      </main>
      <footer className='w-full relative dark:bg-slate-950 border-t text-xs text-slate-800 dark:text-sky-500 text-center border-slate-200 dark:border-slate-800 p-8'>
        &copy; 2024 Oh, i see!. All rights reserved.
      </footer>
    </div>
  )
}
