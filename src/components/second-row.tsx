import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const coaches = [
  {
    name: 'Coach Mercury',
    specialty: 'Thay đổi tư duy',
  },
  {
    name: 'Coach Venus',
    specialty: 'Cải thiện mối quan hệ',
  },
  {
    name: 'Coach Jupiter',
    specialty: 'Thực hành chánh niệm',
  },
  {
    name: 'Coach Saturn',
    specialty: 'Quản lý căng thẳng',
  },
  {
    name: 'Coach Neptune',
    specialty: 'Lối sống hạnh phúc',
  },
  {
    name: 'Coach Mars',
    specialty: 'Phát triển sự nghiệp',
  },
  {
    name: 'Coach Uranus',
    specialty: 'Sức khỏe toàn diện',
  },
]

interface Coach {
  name: string
  specialty: string
}

export default function SecondRow() {
  // const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null)

  const handleScheduleSession = (coach: Coach) => {
    // setSelectedCoach(coach)
  }

  async function handleSubmitForm(
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault()
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <Card>
        <CardHeader>
          <CardTitle>Kết nối với huấn luyện viên</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className='w-full'>
            <div className='flex space-x-4 pb-4 overflow-x-auto'>
              {coaches.map((coach) => (
                <div
                  key={coaches.indexOf(coach)}
                  className='inline-block px-4 py-4 pt-3 border dark:border-slate-800 border-slate-200 rounded-lg space-y-4'
                >
                  <div className='space-y-1'>
                    <CardTitle className='text-sm'>{coach.name}</CardTitle>
                    <p className='text-xs opacity-70'>{coach.specialty}</p>
                  </div>
                  <div className='w-40 flex'>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => handleScheduleSession(coach)}
                          variant='outline'
                          className='w-full text-xs'
                        >
                          Đặt Lịch
                        </Button>
                      </DialogTrigger>
                      <DialogContent className='sm:max-w-[425px]'>
                        <DialogHeader>
                          <DialogTitle>Đặt lịch với {coach.name}</DialogTitle>
                          <DialogDescription>
                            Điền vào form dưới đây để lên lịch. Chúng tôi sẽ
                            liên hệ lại với bạn kèm theo xác nhận.{' '}
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmitForm} className='space-y-4'>
                          <div className='space-y-2'>
                            <Label htmlFor='name'>Tên</Label>
                            <Input id='name' placeholder='Tên' required />
                          </div>
                          <div className='space-y-2'>
                            <Label htmlFor='email'>Email</Label>
                            <Input
                              id='email'
                              type='email'
                              placeholder='m@example.com'
                              required
                            />
                          </div>
                          <div className='space-y-2'>
                            <Label htmlFor='preferred-time'>
                              Thời gian phù hợp
                            </Label>
                            <Input
                              id='preferred-time'
                              type='datetime-local'
                              required
                            />
                          </div>
                          <DialogFooter>
                            <Button type='submit'>Xác nhận</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Góp ý của bạn</CardTitle>
        </CardHeader>
        <CardContent>
          <form className='space-y-4'>
            <div className='space-y-2'>
              {/* <Label htmlFor='feedback'>Góp ý của bạn</Label> */}
              <Textarea
                id='feedback'
                placeholder='Oh, i see! có thể làm gì để cải thiện?'
                className='h-[150px]'
              />
            </div>
            <Button type='submit' className='w-full'>
              Gửi
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
