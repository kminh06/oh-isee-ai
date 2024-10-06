'use client'

import Chat from '@/components/chat'
import SecondRow from '@/components/second-row'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useChat } from 'ai/react'

export default function Page() {
  return (
    <div className='flex flex-col min-h-screen'>
      <header className='flex max-w-5xl mx-auto w-full relative justify-center p-4 sm:p-8'>
        <img src='/logo-full.svg' alt='logo' className='h-8 sm:h-12' />
        <div className='absolute right-4 sm:right-8'>
          <ThemeToggle />
        </div>
      </header>
      <main className='flex flex-grow w-full mx-auto flex-col px-4 sm:px-8 max-w-5xl gap-4'>
        <Chat />
        <SecondRow />
        <p className='text-center text-slate-700 dark:text-slate-200 leading-relaxed p-8 sm:p-16 mx-auto text-sm'>
          Oh, i see! là một nền tảng huấn luyện tinh thần và cảm xúc, giúp bạn
          phá vỡ giới hạn tư duy và tìm thấy sự kết nối sâu sắc với bản thân và
          thế giới xung quanh. Với sự hướng dẫn từ các huấn luyện viên chuyên
          nghiệp, Oh, i see! hỗ trợ bạn quản lý căng thẳng, cải thiện mối quan
          hệ, và xây dựng lối sống hạnh phúc. Thử nghiệm phương pháp độc đáo này
          để trải nghiệm sự thay đổi tích cực trong cuộc sống, và đừng quên giới
          thiệu cho bạn bè để cùng nhau phát triển!
        </p>
      </main>
      <footer className='w-full relative dark:bg-slate-950 border-t text-xs text-slate-800 dark:text-sky-500 text-center border-slate-200 dark:border-slate-800 p-8'>
        &copy; 2024 Oh, i see!. All rights reserved.
      </footer>
    </div>
  )
}
