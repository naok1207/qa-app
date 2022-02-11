import { db } from '../firebase'
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore'

export type User = {
  id: string
  email: string
  name: string
  admin?: number
  avatar?: string
}

export type UpdateParams = {
  email?: string
  name?: string
  admin?: number
  avatar?: string
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

export const updateUser = async (user: User, params: UpdateParams) => {
  const ref = doc(db, 'users', user.id)
  await updateDoc(ref, params)
}
