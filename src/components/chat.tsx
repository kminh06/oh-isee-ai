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
import { Textarea } from './ui/textarea'

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
    bottom.current?.scrollIntoView({
      block: 'end',
    })
  }, [messages])

  return (
    <Card className='col-span-1'>
      <CardHeader className='pb-2'>
        <CardTitle>Chat với Oh, i see!</CardTitle>
      </CardHeader>
      <CardContent className='p-4 pr-0'>
        <div className='flex w-full relative'>
          <ScrollArea className='pr-4 h-[400px] w-full absolute bottom-0 overflow-auto flex flex-col justify-end'>
            <div className={`mb-6 flex w-full gap-2 justify-start`}>
              <img
                src='/logo-square.svg'
                alt='avatar'
                className='h-5 w-5 relative top-1'
              />
              <span
                className={`inline-block py-3 px-4 text-sm rounded-lg
                    bg-slate-200 dark:bg-slate-800 text-gray-800 dark:text-slate-200`}
              >
                Xin chào! Tôi là Oh, i see!, huấn luyện viên sức khỏe tinh thần
                AI của bạn. Tôi có thể hỗ trợ bạn như thế nào?
              </span>
            </div>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-6 flex w-full gap-2 ${
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
                  className={`inline-block py-3 px-4 text-sm rounded-lg ${
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
          </ScrollArea>
        </div>
      </CardContent>
      <CardFooter className='p-4 flex flex-col'>
        <form
          className='w-full  rounded-md relative flex gap-2'
          onSubmit={handleSubmit}
        >
          <Textarea
            className='outline-none resize-none overflow-hidden bg-transparent pl-4 pr-16 pt-4 pb-12 w-full text-sm'
            value={input}
            placeholder='Suy nghĩ của bạn...'
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
            disabled={isLoading}
          ></Textarea>
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
