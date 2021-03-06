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
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth'

export type User = {
  id: string
  email: string
  name: string
}

export type SignInUser = {
  email: string
  password: string
}
export type SignUpUser = {
  name: string
  email: string
  password: string
}

export type AuthActions = {
  createSession: (user: SignInUser, onSuccess: () => void) => void
  createUser: (user: SignUpUser, onSuccess: () => void) => void
  deleteSession: (onSuccess: () => void) => void
}

export const createUser = async (user: SignUpUser, onSuccess: () => void) => {
  createUserWithEmailAndPassword(firebaseAuth, user.email, user.password)
    .then((userCredential) => {
      console.log('success', userCredential)
      create({
        id: userCredential.user.uid,
        name: user.name,
        email: user.email,
      } as User)
      if (!firebaseAuth.currentUser) return
      sendEmailVerification(firebaseAuth.currentUser).then(() => {
        onSuccess()
      })
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
    })
}

// 新規会員登録
export const createSession = (
  user: SignInUser,
  onSuccess: (isVerified: boolean) => void,
) => {
  console.log(user)
  // signInWithEmailAndPassword(firebaseAuth, 'test@example.com', 'hogehoge')
  signInWithEmailAndPassword(firebaseAuth, user.email, user.password)
    .then((userCredential) => {
      const user = userCredential.user
      if (!user.emailVerified && firebaseAuth.currentUser) {
        sendEmailVerification(firebaseAuth.currentUser)
      }
      onSuccess(user.emailVerified)
      console.log('success sign in!')
      console.log(user)
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
    })
}

export const verifyEmail = (onSuccess: () => void) => {
  let timer = 30000
  const interval = setInterval(() => {
    firebaseAuth.currentUser?.reload().then((ok) => {
      console.log('interval')
      if (firebaseAuth.currentUser?.emailVerified) {
        onSuccess()
        clearInterval(interval)
      }
      if (timer <= 0) {
        clearInterval(interval)
      }
      timer -= 1000
    })
  }, 1000)
}

export const deleteSession = (onSuccess: () => void) => {
  firebaseSignOut(firebaseAuth)
    .then(() => {
      console.log('signOut success!!')
      onSuccess()
    })
    .catch((error) => {
      console.error(error)
    })
}

const create = async (user: User) => {
  try {
    await setDoc(doc(db, 'users', user.id), user)
    console.log('Created User name: ', user.id)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export const get = (userId: string, set: (user: User) => void) => {
  onSnapshot(doc(db, 'users', userId), (doc) => {
    set(doc.data() as User)
  })
}
