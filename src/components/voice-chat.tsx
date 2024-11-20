'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  LiveKitRoom,
  useVoiceAssistant,
  BarVisualizer,
  RoomAudioRenderer,
  VoiceAssistantControlBar,
  AgentState,
  DisconnectButton,
} from '@livekit/components-react'
import { useCallback, useEffect, useState } from 'react'
import { MediaDeviceFailure } from 'livekit-client'
import type { ConnectionDetails } from '@/app/api/connection-details/route'
import { NoAgentNotification } from '@/components/NoAgentNotification'
import { CloseIcon } from '@/components/CloseIcon'
import { useKrispNoiseFilter } from '@livekit/components-react/krisp'
import '@livekit/components-styles'
import { MessageSquare, Mic, Phone } from 'lucide-react'
import { Button } from './ui/button'
import { useAuth } from '@clerk/nextjs'
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

export default function VoiceChat() {
  const [connectionDetails, updateConnectionDetails] = useState<
    ConnectionDetails | undefined
  >(undefined)
  const [agentState, setAgentState] = useState<AgentState>('disconnected')

  const onConnectButtonClicked = useCallback(async () => {
    const url = new URL(
      process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT ??
        '/api/connection-details',
      window.location.origin
    )
    const response = await fetch(url.toString())
    const connectionDetailsData = await response.json()
    updateConnectionDetails(connectionDetailsData)
  }, [])

  return (
    <div
      data-lk-theme='default'
      className='h-full w-full flex p-4 flex-col items-center justify-center bg-transparent'
    >
      <LiveKitRoom
        token={connectionDetails?.participantToken}
        serverUrl={connectionDetails?.serverUrl}
        connect={connectionDetails !== undefined}
        audio={true}
        video={false}
        onMediaDeviceFailure={onDeviceFailure}
        onDisconnected={() => {
          updateConnectionDetails(undefined)
        }}
        style={{ '--lk-bg': 'white' } as React.CSSProperties}
        className='grid grid-rows-[2fr_1fr] items-center'
      >
        <SimpleVoiceAssistant onStateChange={setAgentState} />
        <ControlBar
          onConnectButtonClicked={onConnectButtonClicked}
          agentState={agentState}
        />
        <RoomAudioRenderer />
        <NoAgentNotification state={agentState} />
      </LiveKitRoom>
    </div>
  )
}

function SimpleVoiceAssistant(props: {
  onStateChange: (state: AgentState) => void
}) {
  const { state, audioTrack } = useVoiceAssistant()
  useEffect(() => {
    props.onStateChange(state)
  }, [props, state])
  return (
    <div className='h-40 max-w-xs w-full mx-auto'>
      <BarVisualizer
        state={state}
        barCount={5}
        trackRef={audioTrack}
        className='agent-visualizer'
        options={{ minHeight: 28 }}
      />
    </div>
  )
}

function ControlBar(props: {
  onConnectButtonClicked: () => void
  agentState: AgentState
}) {
  const { isSignedIn } = useAuth()
  const [open, setOpen] = useState(false)
  /**
   * Use Krisp background noise reduction when available.
   * Note: This is only available on Scale plan, see {@link https://livekit.io/pricing | LiveKit Pricing} for more details.
   */
  const krisp = useKrispNoiseFilter()
  useEffect(() => {
    krisp.setNoiseFilterEnabled(true)
  }, [])

  return (
    <div className='relative h-auto '>
      <AnimatePresence>
        {props.agentState === 'disconnected' && (
          <motion.button
            initial={{ opacity: 0, top: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, top: '-10px' }}
            transition={{ duration: 1, ease: [0.09, 1.04, 0.245, 1.055] }}
            className='uppercase mx-auto px-4 py-2 bg-sky-500 hover:bg-sky-600 transition-all font-sans text-white rounded-md flex items-center gap-1 pl-3'
            onClick={() => {
              if (isSignedIn) {
                props.onConnectButtonClicked()
              } else {
                setOpen(true)
              }
            }}
          >
            <Mic className='h-4 opacity-60' />
            <span className=''>Bắt đầu trò chuyện</span>
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {props.agentState !== 'disconnected' &&
          props.agentState !== 'connecting' && (
            <motion.div
              initial={{ opacity: 0, top: '10px' }}
              animate={{ opacity: 1, top: 0 }}
              exit={{ opacity: 0, top: '-10px' }}
              transition={{ duration: 0.4, ease: [0.09, 1.04, 0.245, 1.055] }}
              className='flex h-8 absolute left-1/2 -translate-x-1/2  justify-center'
            >
              <VoiceAssistantControlBar controls={{ leave: false }} />
              <DisconnectButton>
                <CloseIcon />
              </DisconnectButton>
            </motion.div>
          )}
      </AnimatePresence>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Đăng nhập yêu cầu</DialogTitle>
            <DialogDescription>
              Bạn cần đăng nhập để gửi góp ý. Vui lòng đăng nhập để tiếp tục.
            </DialogDescription>
          </DialogHeader>
          <Button
            variant='default'
            onClick={() => (window.location.href = '/login')}
          >
            Đăng nhập
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function onDeviceFailure(error?: MediaDeviceFailure) {
  console.error(error)
  alert(
    'Error acquiring camera or microphone permissions. Please make sure you grant the necessary permissions in your browser and reload the tab'
  )
}
