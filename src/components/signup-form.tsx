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
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export function SignupForm() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [code, setCode] = useState('')
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!isLoaded) return

    // Start the sign-up process using the email, password, first name, and last name provided
    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      })

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      })

      // Set 'verifying' true to display second form
      // and capture the OTP code
      setVerifying(true)
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }

    setLoading(false)
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.push('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error('Error:', JSON.stringify(err, null, 2))
    }

    setLoading(false)
  }

  if (verifying) {
    return (
      <Card className='mx-auto max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Xác minh email của bạn</CardTitle>
          <CardDescription>
            Nhập mã xác minh đã được gửi đến email của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify}>
            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='code'>Mã xác minh</Label>
                <Input
                  id='code'
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>
              <Button type='submit' disabled={loading} className='w-full'>
                Xác minh
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className='mx-auto max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Đăng ký</CardTitle>
          <CardDescription>
            Nhập thông tin của bạn bên dưới để tạo tài khoản mới
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='firstName'>Tên</Label>
                <Input
                  id='firstName'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='lastName'>Họ</Label>
                <Input
                  id='lastName'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
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
              <Label htmlFor='password'>Mật khẩu</Label>
              <Input
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                required
              />
            </div>
            <Button disabled={loading} type='submit' className='w-full'>
              Đăng ký
            </Button>
          </div>
          <div className='mt-4 text-center text-sm'>
            Bạn đã có tài khoản?{''}
            <Link href='/sign-in' className='underline ml-1'>
              Đăng nhập
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
