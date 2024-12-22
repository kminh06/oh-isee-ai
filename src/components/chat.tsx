'use client'

import { useChat } from 'ai/react'
import { ArrowUp, Mic, Phone } from 'lucide-react'
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Feedback from './feedback'
import Reviews from './reviews'

const betaContent = (
  <DialogHeader>
    <DialogTitle>Tính năng cao cấp</DialogTitle>
    <DialogDescription>
      Tính năng này sẽ sớm ra mắt. Hãy quay lại sau để trải nghiệm.
    </DialogDescription>
  </DialogHeader>
)

export default function Chat() {
  const [id, setId] = useState(Math.random().toString(36).substring(2, 9))
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      body: {
        id: id,
      },
    })
  const bottom = useRef<HTMLDivElement>(null)
  const [isVoiceChatOpen, setIsVoiceChatOpen] = useState(false)
  const [tab, setTab] = useState('text')

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
    <Card className='col-span-1 flex flex-col w-full self-center sm:mx-auto border-0 sm:border shadow-none sm:shadow-sm h-full'>
      <CardHeader className='flex p-0 pt-2 sm:p-6 flex-row justify-between w-full'>
        <CardTitle>Chat với Oh, i see!</CardTitle>
        <div className='flex gap-2 flex-row relative top-[-10px] right-[-6px]'>
          {/* <Feedback /> */}
          <Tabs
            defaultValue='text'
            value={tab}
            onValueChange={setTab}
            className=''
          >
            <TabsList>
              <TabsTrigger value='text'>Text</TabsTrigger>
              <TabsTrigger value='voice'>Voice</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      {tab === 'text' ? (
        <>
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
                        message.role === 'user'
                          ? ' justify-end'
                          : 'justify-start'
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
          <CardFooter className='pb-4 px-0 sm:px-4 pt-4 flex flex-col relative'>
            <form
              className='w-full  rounded-md relative flex gap-2'
              onSubmit={handleSubmit}
            >
              <button
                type='button'
                disabled={isLoading}
                className='absolute text-gray-800 dark:text-gray-200 disabled:opacity-50 cursor-pointer left-4 mt-4'
                onClick={(e) => {
                  e.preventDefault()
                  setTab('voice')
                }}
              >
                <Mic className='h-5 w-5 ' />
              </button>
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
            <Reviews />
            {/* <div className='absolute right-1 bottom-1'>
              <Feedback />
            </div> */}
          </CardFooter>
        </>
      ) : (
        <>
          <CardContent className='h-full px-0 sm:px-6'>
            <VoiceChat />
          </CardContent>
          <CardFooter className='relative'>
            <p className='text-xs text-yellow-700 dark:text-yellow-600 text-center w-full mt-2'>
              *Oh, i see! Chatbot là một AI và có thể gây lỗi.
            </p>
            <Reviews />
          </CardFooter>
        </>
      )}
    </Card>
  )
}
