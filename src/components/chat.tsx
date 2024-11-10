'use client'

import { useChat } from 'ai/react'
import { ArrowUp } from 'lucide-react'
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
import IncrementalWordRender from './incremental-words'
import { isMobile } from 'react-device-detect'
import MarkDown from 'react-markdown'
import VoiceChat from './voice-chat'

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

  useEffect(() => {
    if (!isLoading && !isMobile) {
      document.getElementById('chat-input')?.focus()
    }
  }, [isLoading])

  return (
    <Card className='col-span-1 w-full self-center sm:mx-auto border-0 sm:border shadow-none sm:shadow-sm'>
      <CardHeader className=' hidden sm:block'>
        <CardTitle>Chat với Oh, i see!</CardTitle>
      </CardHeader>
      <CardContent className='p-0 sm:pl-4'>
        <div className='flex w-full relative'>
          <ScrollArea className='pr-3 sm:pr-4 h-[420px] w-full absolute bottom-0 overflow-auto'>
            <div className='flex flex-col pt-4 justify-end'>
              <div className={`mb-6 flex w-full gap-2 justify-start`}>
                <img
                  src='/logo-square.svg'
                  alt='avatar'
                  className='h-5 w-5 relative top-1'
                />
                <span
                  className={`inline-block py-3 px-4 text-base rounded-lg
                    bg-gray-200/50 dark:bg-gray-800 text-gray-800 dark:text-gray-200`}
                >
                  <IncrementalWordRender
                    sentence={
                      'Xin chào! Tôi là Oh, i see!, huấn luyện viên sức khỏe tinh thần AI của bạn. Tôi có thể hỗ trợ bạn như thế nào?'
                    }
                  />
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
                    className={`inline-block py-3 px-4 text-base rounded-lg ${
                      message.role === 'user'
                        ? 'bg-sky-500 dark:bg-sky-600 text-white'
                        : 'bg-gray-200/50 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <MarkDown>{message.content}</MarkDown>
                  </span>
                </div>
              ))}
              <div ref={bottom}></div>
            </div>
          </ScrollArea>
        </div>
      </CardContent>
      <CardFooter className='pb-4 px-0 sm:px-4 pt-4 flex flex-col'>
        <form
          className='w-full  rounded-md relative flex gap-2'
          onSubmit={handleSubmit}
        >
          <VoiceChat isLoading={isLoading} />
          <Textarea
            className='outline-none resize-none overflow-auto bg-transparent pl-12 pr-16 pt-4 pb-4 w-full'
            style={{
              fontSize: '1rem',
            }}
            value={input}
            id='chat-input'
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
            className='p-2 bg-gray-200 dark:bg-gray-800 h-fit mt-4 absolute right-4 rounded-full disabled:opacity-50 '
            type='submit'
            disabled={isLoading || input === ''}
          >
            <ArrowUp className='h-5 w-5' />
            <span className='sr-only'>Send message</span>
          </button>
        </form>
        <p className='text-xs text-yellow-700 dark:text-yellow-600 text-center w-full mt-2'>
          *Oh, i see! Chatbot là một AI và có thể gây lỗi.
        </p>
      </CardFooter>
    </Card>
  )
}
