import { db } from './firebase'
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  getDocFromServer,
} from 'firebase/firestore'

export async function saveChat({
  id,
  messages,
  userId,
}: {
  id: string
  messages: string | any[]
  userId: string
}) {
  try {
    console.log('ID: ', id, messages)

    const time = new Date().toISOString()

    const chatRef = await getDoc(doc(db, 'chats', id))

    console.log('Chat ref: ', chatRef)

    if (chatRef.exists()) {
      await updateDoc(doc(db, 'chats', id), {
        messages,
        last_updated: new Date().toISOString(),
      })
    } else {
      await setDoc(doc(db, 'chats', id), {
        messages,
        start_time: time,
        last_updated: time,
      })
    }
  } catch (error) {
    console.log(error)
    console.error('Failed to save chat in database')
    throw error
  }
}
