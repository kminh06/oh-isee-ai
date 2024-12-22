import React, { useState } from 'react'
import ReactStars from 'react-stars'
import { db } from '@/app/utils/firebase'
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore'
import { useToast } from '@/hooks/use-toast'

export default function Reviews() {
  const [rating, setRating] = useState(0)
  const [id, setId] = useState(
    'anon_' + Math.random().toString(36).substring(2, 9)
  )
  const { toast } = useToast()

  const ratingChanged = async (newRating: number) => {
    setRating(newRating)
    try {
      await setDoc(doc(db, 'reviews', id), {
        rating: newRating,
        time: new Date().toISOString(),
      })
      toast({
        title: '🙌 Cảm ơn bạn đã đánh giá!',
      })
    } catch (error) {
      console.error('Failed to save review in database')
      throw error
    }
  }

  return (
    <div className='flex flex-row items-center text-sm gap-2 mt-6'>
      <p>Đánh giá:</p>
      <ReactStars
        value={rating}
        count={5}
        onChange={ratingChanged}
        size={24}
        color2={'#ffd700'}
        half={false}
      />
    </div>
  )
}
