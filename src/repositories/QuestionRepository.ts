import { db } from '../firebase'
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  Timestamp,
} from 'firebase/firestore'
import { User } from 'repositories/UserRepository'

export type QuestionDoc = {
  title: string
  content: string
}

export type QuestionGetDoc = {
  title: string
  content: string
  userId: string
  createdAt: Timestamp
}

export type Question = {
  id: string
  title: string
  content: string
  userId: string
  createdAt: Date
}

const questionsRef = collection(db, 'questions')

export const create = async (user: User, questionDoc: QuestionDoc) => {
  const docData = {
    ...questionDoc,
    userId: user.id,
    createdAt: Timestamp.fromDate(new Date()),
  }
  await addDoc(collection(db, 'questions'), docData)
}

export const gets = async () => {
  const q = query(questionsRef, orderBy('createdAt', 'desc'))
  const querySnapshot = await getDocs(q)
  if (!querySnapshot.docs.length) return []
  return querySnapshot.docs.map((doc) => format(doc))
}

export const get = async (questionId: string) => {
  const ref = doc(db, 'questions', questionId)
  const snapshot = await getDoc(ref)
  if (!snapshot.exists()) return
  return format(snapshot)
}

const format = (doc: QueryDocumentSnapshot<DocumentData>): Question => {
  const { title, content, userId, createdAt } = doc.data() as QuestionGetDoc
  return {
    id: doc.id,
    title,
    content,
    userId,
    createdAt: createdAt.toDate(),
  } as Question
}
