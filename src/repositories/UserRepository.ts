import { db } from '../firebase'
import { collection, onSnapshot, query } from 'firebase/firestore'

export type User = {
  id: string
  email: string
  name: string
  admin?: number
}

export const getUsers = (onSuccess: (users: User[]) => void) => {
  const q = query(collection(db, 'users'))

  return onSnapshot(q, (querySnapShot) => {
    const userDocs: User[] = []
    querySnapShot.forEach((doc) => {
      userDocs.push(doc.data() as User)
    })
    onSuccess(userDocs)
  })
}
