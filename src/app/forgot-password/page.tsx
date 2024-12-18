'use client'
import React, { useState } from 'react'
import { useAuth, useSignIn } from '@clerk/nextjs'
import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Header from '@/components/header'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [successfulCreation, setSuccessfulCreation] = useState(false)
  const [secondFactor, setSecondFactor] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()
  const { isSignedIn } = useAuth()
  const { isLoaded, signIn, setActive } = useSignIn()

  if (!isLoaded) {
    return null
  }

  // If the user is already signed in,
  // redirect them to the home page
  if (isSignedIn) {
    router.push('/')
  }

  // Send the password reset code to the user's email
  async function create(e: React.FormEvent) {
    e.preventDefault()
    await signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      .then((_) => {
        setSuccessfulCreation(true)
        setError('')
      })
      .catch((err) => {
        console.error('error', err.errors[0].longMessage)
        setError(err.errors[0].longMessage)
      })
  }

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
  async function reset(e: React.FormEvent) {
    e.preventDefault()
    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      })
      .then((result) => {
        // Check if 2FA is required
        if (result.status === 'needs_second_factor') {
          setSecondFactor(true)
          setError('')
        } else if (result.status === 'complete') {
          // Set the active session to
          // the newly created session (user is now signed in)
          setActive({ session: result.createdSessionId })
          setError('')
        } else {
          console.log(result)
        }
      })
      .catch((err) => {
        console.error('error', err.errors[0].longMessage)
        setError(err.errors[0].longMessage)
      })
  }

  return (
    <div className='flex-col flex min-h-screen'>
      <Header />
      <main className='flex-grow flex justify-center items-center'>
        <Card className='mx-auto w-96'>
          <CardHeader>
            <CardTitle className='text-2xl'>Quên mật khẩu</CardTitle>
            <CardDescription>
              Nhập email của bạn để tạo mật khẩu mới
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className='space-y-6'
              onSubmit={!successfulCreation ? create : reset}
            >
              {!successfulCreation && (
                <>
                  <div className='space-y-1'>
                    <Label htmlFor='email'>Email của bạn</Label>
                    <Input
                      type='email'
                      id='email'
                      placeholder='e.g john@doe.com'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button type='submit'>Gửi mã đặt lại mật khẩu</Button>
                  {error && (
                    <p className='mt-2 text-sm text-red-600'>{error}</p>
                  )}
                </>
              )}

              {successfulCreation && (
                <>
                  <div className='space-y-1'>
                    <Label htmlFor='code'>
                      Nhập mã xác nhận đã được gửi đến email
                    </Label>
                    <Input
                      type='text'
                      id='code'
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                  <div className='space-y-1'>
                    <Label htmlFor='password'>Nhập mật khẩu mới của bạn</Label>
                    <Input
                      type='password'
                      id='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <Button type='submit'>Đặt lại mật khẩu</Button>
                  {error && (
                    <p className='mt-2 text-sm text-red-600'>{error}</p>
                  )}
                </>
              )}

              {secondFactor && (
                <p className='text-sm text-red-600'>
                  2FA is required, but this UI does not handle that
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
