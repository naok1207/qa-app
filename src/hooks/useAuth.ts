import { useState } from 'react'
import {
  SignInUser,
  SignUpUser,
  createUser,
  createSession,
  deleteSession,
} from 'repositories/AuthRepository'

export type AuthStatus = 'Loading' | 'SignedIn' | 'SignedOut'

export type AuthActions = {
  signIn: (user: SignInUser) => void
  signUp: (user: SignUpUser) => void
  signOut: () => void
}

const useAuth = (): [AuthStatus, AuthActions] => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('Loading')

  const signIn = (user: SignInUser) => {
    createSession(user, () => {
      setAuthStatus('SignedIn')
    })
  }

  const signUp = (user: SignUpUser) => {
    createUser(user, () => {
      setAuthStatus('SignedIn')
    })
  }

  const signOut = () => {
    deleteSession(() => {
      setAuthStatus('SignedOut')
    })
  }

  return [authStatus, { signIn, signUp, signOut }]
}

export default useAuth
