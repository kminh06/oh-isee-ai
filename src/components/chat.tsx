'use client'

import { useChat } from 'ai/react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader, Send } from 'lucide-react'
import { ScrollArea } from './ui/scroll-area'
import React, { useState, useEffect, useRef } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ThemeToggle } from './ui/theme-toggle'

interface Message {
  content: string
  role: 'user' | 'assistant'
  id: string
  createdAt: Date
}

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat()
  const bottom = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messages.length === 0) return
    bottom.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <Card className='col-span-1'>
      <CardHeader className='pb-2'>
        <CardTitle>Chat với Oh, i see!</CardTitle>
      </CardHeader>
      <CardContent className='p-4'>
        <ScrollArea className='h-[400px] w-full'>
          <div className='pr-4'>
            <div className={`mb-4 flex w-full gap-2 justify-start`}>
              <img
                src='/logo-square.svg'
                alt='avatar'
                className='h-5 w-5 relative top-1'
              />
              <span
                className={`inline-block py-2 px-4 text-sm rounded-lg
                    bg-slate-200 dark:bg-slate-800 text-gray-800 dark:text-slate-200`}
              >
                Xin chào! Mình là Oh, i see!, huấn luyện viên sức khỏe tinh thần
                AI của bạn. Mình có thể hỗ trợ bạn như thế nào?
              </span>
            </div>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex w-full gap-2 ${
                  message.role === 'user' ? ' justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <img
                    src='/logo-square.svg'
                    alt='avatar'
                    className='h-5 w-5 relative top-1'
                  />
                )}
                <span
                  className={`inline-block py-2 px-4 text-sm rounded-lg ${
                    message.role === 'user'
                      ? 'bg-sky-500 dark:bg-sky-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-gray-800 dark:text-slate-200'
                  }`}
                >
                  {message.content}
                </span>
              </div>
            ))}
            <div ref={bottom}></div>
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className='p-4 flex flex-col'>
        <form
          className='w-full  rounded-md relative flex gap-2'
          onSubmit={handleSubmit}
        >
          <Input
            className='outline-none bg-transparent pl-6 pr-4 pt-6 pb-12 w-full text-sm'
            value={input}
            placeholder='Suy nghĩ của bạn...'
            onChange={handleInputChange}
          ></Input>
          <button
            className='p-2 bg-slate-200 dark:bg-slate-800 h-fit mt-4 rounded-md absolute right-4'
            type='submit'
          >
            <Send className='h-4 w-4' />
            <span className='sr-only'>Send message</span>
          </button>
        </form>
        <p className='text-xs text-yellow-600 text-center w-full mt-2'>
          *Oh, i see! Chatbot là một AI và có thể gây lỗi.
        </p>
      </CardFooter>
    </Card>
  )
}
