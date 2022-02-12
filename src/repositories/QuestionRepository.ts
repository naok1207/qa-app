import { db } from '../firebase'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { User } from 'repositories/UserRepository'

export interface QuestionDoc {
  title: string
  content: string
}

export interface Question extends QuestionDoc {
  id: string
  userId: string
  createdAt: Date
}

export const create = async (user: User, questionDoc: QuestionDoc) => {
  const docData = {
    ...questionDoc,
    userId: user.id,
    createdAt: Timestamp.fromDate(new Date()),
  }
  await addDoc(collection(db, 'questions'), docData)
}
