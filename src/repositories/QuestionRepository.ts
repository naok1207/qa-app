import { db } from '../firebase'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  Timestamp,
  where,
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

export const deleteQuestion = async (userId: string, questionId: string) => {
  const question = await get(questionId)
  if (!question || question.userId !== userId) return
  await deleteDoc(doc(db, 'questions', questionId))
}

export const observeOwn = (
  userId: string,
  onProcess: (questions: Question[]) => void,
) => {
  const q = query(
    questionsRef,
    orderBy('createdAt', 'desc'),
    where('userId', '==', userId),
  )
  return onSnapshot(q, (snapshot) => {
    if (!snapshot.docs.length) return
    const questions = snapshot.docs.map((doc) => format(doc))
    onProcess(questions)
  })
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
