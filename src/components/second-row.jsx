'use client'

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

export default function SecondRow() {
  // const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null)
  const [clicked, setClicked] = useState(false)

  const handleScheduleSession = (coach) => {
    // setSelectedCoach(coach)
  }

  async function handleSubmitForm(id, url) {
    setClicked(true)
    const form = document.forms[id]
    const time = new Date().toLocaleString()
    document.getElementById('time').value = time

    const formData = new FormData(form)
    console.log(formData)
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      })

      alert('Cảm ơn bạn đã gửi!')
      form.reset()
    } catch (error) {
      console.log(error)
    }

    setClicked(false)
  }

  return (
    <div className='grid grid-cols-1 grid-rows-1 sm:grid-cols-2 lg:grid-cols-1 gap-4'>
      <Card>
        <CardHeader>
          <CardTitle>Kết nối với huấn luyện viên</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='w-full'>
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
                        <form
                          id='schedule-form'
                          onSubmit={(e) => {
                            e.preventDefault()
                            handleSubmitForm(
                              'schedule-form',
                              process.env.NEXT_PUBLIC_SCRIPT_URL_SCHEDULING
                            )
                          }}
                          className='space-y-4'
                        >
                          <Input
                            name='coach'
                            className='hidden'
                            value={coach.name}
                          />
                          <div className='flex flex-row gap-2'>
                            <div className='space-y-1'>
                              <Label htmlFor='name'>Tên*</Label>
                              <Input
                                name='name'
                                id='name'
                                placeholder='Tên'
                                required
                              />
                            </div>
                            <div></div>
                            <div className='space-y-1'>
                              <Label htmlFor='phone'>Số điện thoại*</Label>
                              <Input
                                id='phone'
                                type='tel'
                                name='phone'
                                placeholder='09XX-XXX-XXX'
                                required
                              />
                            </div>
                          </div>
                          <div className='space-y-1'>
                            <Label htmlFor='email'>Email*</Label>
                            <Input
                              id='email'
                              type='email'
                              name='email'
                              placeholder='m@example.com'
                              required
                            />
                          </div>
                          <div className='space-y-1'>
                            <Label htmlFor='preferred-time'>
                              Thời gian phù hợp*
                            </Label>
                            <Input
                              id='preferred-time'
                              type='datetime-local'
                              name='preferred-time'
                              required
                            />
                          </div>
                          <div className='space-y-1'>
                            <Label htmlFor='notes'>
                              Thông tin về bạn và nhu cầu của bạn
                            </Label>
                            <Textarea id='notes' name='notes' />
                          </div>
                          <DialogFooter>
                            <Button
                              className='mt-4'
                              disabled={clicked}
                              type='submit'
                            >
                              Xác nhận
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='pb-4'>
          <CardTitle>Đăng ký làm huấn luyện viên</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmitForm(
                'signup-form',
                process.env.NEXT_PUBLIC_SCRIPT_URL_FEEDBACK
              )
            }}
            className='space-y-3'
            id='signup-form'
          >
            <div className='space-y-1'>
              <Label htmlFor='name'>Tên*</Label>
              <Input id='name' name='name' placeholder='Tên' required />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='email'>Email*</Label>
              <Input
                id='email'
                type='email'
                name='email'
                placeholder='m@example.com'
                required
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='phone'>Số điện thoại*</Label>
              <Input
                id='phone'
                type='tel'
                name='phone'
                placeholder='09XX-XXX-XXX'
                required
              />
            </div>
            {/* <div className='space-y-1'>
              <Label htmlFor='specialty'>Chuyên môn*</Label>
              <Input
                id='specialty'
                name='specialty'
                placeholder='Chuyên môn'
                required
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='experience'>Kinh nghiệm*</Label>
              <Textarea
                id='experience'
                name='experience'
                placeholder='Kinh nghiệm của bạn'
                required
              />
            </div> */}
            <Input
              id='time'
              name='time'
              // type='datetime-local'
              className='hidden'
            ></Input>
            <span className=''>
              <Button disabled={clicked} type='submit' className='w-full mt-6'>
                Đăng ký
              </Button>
            </span>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
