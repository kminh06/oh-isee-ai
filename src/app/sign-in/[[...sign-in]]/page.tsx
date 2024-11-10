import Header from '@/components/header'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow flex justify-center items-center'>
        <SignIn />
      </main>
    </div>
  )
}
