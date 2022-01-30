import { db, firebaseAuth } from '../firebase'
import {
  // collection,
  doc,
  onSnapshot,
  setDoc,
  // getDoc
} from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth'

export type User = {
  id: string
  email: string
  name: string
}
