'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import data from '@/translations.json'
import { ClerkAPIError } from '@clerk/types'
import { isClerkAPIResponseError } from '@clerk/nextjs/errors'

interface Errors {
  [key: string]: {
    [key: string]: string
  }
}

const errData: Errors = data.errors

export function LoginForm() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<ClerkAPIError[]>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!isLoaded) {
      return
    }

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.push('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      if (isClerkAPIResponseError(err)) setErrors(err.errors)
      console.error(JSON.stringify(err, null, 2))
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className='mx-auto max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Đăng nhập</CardTitle>
          <CardDescription>
            Nhập email của bạn bên dưới để đăng nhập vào tài khoản của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Mật khẩu</Label>
                <Link
                  href='#'
                  className='ml-auto inline-block text-sm underline'
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <Input
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                required
              />
            </div>
            {errors && (
              <ul>
                {errors.map((el, index) => (
                  <li className='text-red-600 text-sm my-0' key={index}>
                    {errData[el.code] ? errData[el.code].vi : el.message}
                  </li>
                ))}
              </ul>
            )}
            <Button disabled={loading} type='submit' className={'w-full mt-2'}>
              Đăng nhập
            </Button>
            {/* <Button type='button' variant='outline' className='w-full'>
              Đăng nhập với Google
            </Button> */}
          </div>
          <div className='mt-4 text-center text-sm'>
            Bạn chưa có tài khoản?{''}
            <Link href='/sign-up' className='underline ml-1'>
              Đăng ký
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
