import { db } from '../firebase'
import {
  addDoc,
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  Timestamp,
} from 'firebase/firestore'

export type AnswerDoc = {
  answer: string
  userId: string
  createdAt: Timestamp
}

export type Answer = {
  answer: string
  userId: string
  createdAt: Date
}

export const observe = (
  questionId: string,
  onProcess: (answers: Answer[]) => void,
) => {
  const q = query(
    collection(db, 'questions', questionId, 'answers'),
    orderBy('createdAt', 'asc'),
  )
  return onSnapshot(q, (snapshot) => {
    if (!snapshot.docs.length) return
    const answers = snapshot.docs.map((doc) => format(doc))
    onProcess(answers)
  })
}

export const create = async (
  questionId: string,
  userId: string,
  answer: string,
) => {
  const answerRef = collection(db, 'questions', questionId, 'answers')
  const docData = {
    answer,
    userId,
    createdAt: Timestamp.fromDate(new Date()),
  } as AnswerDoc
  await addDoc(answerRef, docData)
}

const format = (doc: QueryDocumentSnapshot<DocumentData>): Answer => {
  const { answer, userId, createdAt } = doc.data() as AnswerDoc
  return {
    answer,
    userId,
    createdAt: createdAt.toDate(),
  } as Answer
}
