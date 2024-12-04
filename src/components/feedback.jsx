'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from './ui/textarea'
import { useState } from 'react'

export default function Feedback() {
  const [clicked, setClicked] = useState(false)

  async function handleSubmitForm(id, url) {
    setClicked(true)
    const form = document.forms[id]
    const time = new Date().toLocaleString()
    form.querySelector('#time').value = time

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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='link'>Góp ý</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Góp ý</DialogTitle>
          <DialogDescription>
            Chúng tôi trân trọng ý kiến đóng góp của bạn. Vui lòng điền vào biểu
            mẫu dưới đây.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmitForm(
              'feedback-form',
              process.env.NEXT_PUBLIC_SCRIPT_URL_FEEDBACK
            )
          }}
          id='feedback-form'
        >
          <div className='grid gap-4 py-4'>
            <div className='space-y-1'>
              <Label htmlFor='name'>Tên*</Label>
              <Input name='name' id='name' placeholder='Tên' required />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='feedback'>Ý kiến đóng góp*</Label>
              <Textarea id='feedback' name='feedback' required />
            </div>
            <Input id='time' name='time' className='hidden'></Input>
          </div>
          <DialogFooter>
            <Button disabled={clicked} type='submit'>
              Gửi ý kiến
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
