import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Mic } from 'lucide-react'
import { Button } from './ui/button'

const unauthenticatedContent = (
  <>
    <DialogHeader>
      <DialogTitle>Tính năng cao cấp</DialogTitle>
      <DialogDescription>
        Trò chuyện bằng giọng nói chỉ có sẵn cho người dùng cao cấp. Nâng cấp
        tài khoản của bạn để truy cập tính năng này.
      </DialogDescription>
    </DialogHeader>
    <div className='grid gap-4'>
      <Button>Xem các gói giá</Button>
    </div>
  </>
)

const authenticatedContent = (
  <>
    <DialogHeader>
      <DialogTitle>Tính năng cao cấp</DialogTitle>
      <DialogDescription>
        Bắt đầu trò chuyện bằng giọng nói ngay bây giờ. Bấm vào biểu tượng mic
        để bắt đầu.
      </DialogDescription>
    </DialogHeader>
  </>
)

interface VoiceChatProps {
  isLoading: boolean
}

export default function VoiceChat({ isLoading }: VoiceChatProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type='button'
          disabled={isLoading}
          className='absolute disabled:opacity-50 cursor-pointer left-4 mt-4'
        >
          <Mic className='h-5 w-5 ' />
        </button>
      </DialogTrigger>
      <DialogContent>{authenticatedContent}</DialogContent>
    </Dialog>
  )
}
