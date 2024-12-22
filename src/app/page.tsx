import Chat from '@/components/chat'
import Feedback from '@/components/feedback'
import Header from '@/components/header'
import SecondRow from '@/components/second-row'
// import { auth, currentUser } from '@clerk/nextjs/server'
import { Toaster } from '@/components/ui/toaster'

const description = `Oh, i see! là một nền tảng huấn luyện tinh thần và cảm xúc, giúp bạn phá vỡ giới hạn tư duy và tìm thấy sự kết nối sâu sắc với bản thân và thế giới xung quanh. Với sự hướng dẫn từ các huấn luyện viên chuyên nghiệp, Oh, i see! hỗ trợ bạn quản lý căng thẳng, cải thiện mối quan hệ, và xây dựng lối sống hạnh phúc. Thử nghiệm phương pháp độc đáo này để trải nghiệm sự thay đổi tích cực trong cuộc sống, và đừng quên giới thiệu cho bạn bè để cùng nhau phát triển!`

export default function Page() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='mt-4 flex-grow w-full px-4 sm:px-8'>
        <div className='max-w-[1600px] mx-auto flex flex-col gap-4'>
          <div className='grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4'>
            <Chat />
            <SecondRow />
          </div>
          <p className='text-center text-slate-700 dark:text-slate-200 leading-relaxed pt-4 p-8 sm:pt-12 sm:p-16 mx-auto text-sm'>
            {description}
          </p>
        </div>
      </main>
      <footer className='w-full relative dark:bg-slate-950 border-t text-xs text-slate-800 dark:text-sky-500 text-center border-slate-200 dark:border-slate-800 p-8'>
        &copy; 2024 Oh, i see!. All rights reserved.
        <span className='absolute right-4 bottom-5'>
          <Feedback />
        </span>
      </footer>
      <Toaster />
    </div>
  )
}
