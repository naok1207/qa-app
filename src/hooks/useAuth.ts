import { verifyEmail } from './../repositories/AuthRepository'
import { useEffect, useState } from 'react'
import {
  SignInUser,
  SignUpUser,
  createUser,
  createSession,
  deleteSession,
} from 'repositories/AuthRepository'

export type AuthStatus = 'Loading' | 'SignedIn' | 'Verifying'

export type AuthActions = {
  setAuthStatus: React.Dispatch<React.SetStateAction<AuthStatus>>
  signIn: (user: SignInUser) => void
  signUp: (user: SignUpUser) => void
  verify: () => void
  signOut: () => void
}

const useAuth = (): [AuthStatus, AuthActions] => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('Loading')

  useEffect(() => {
    console.log('authStatus Changed: ', authStatus)
  }, [authStatus])

  const signIn = (user: SignInUser) => {
    createSession(user, (isVerified: boolean) => {
      setAuthStatus(isVerified ? 'SignedIn' : 'Verifying')
    })
  }

  const signUp = async (user: SignUpUser) => {
    await createUser(user, () => {
      setAuthStatus('Verifying')
    })
  }

  const verify = () => {
    verifyEmail(() => {
      setAuthStatus('SignedIn')
    })
  }

  const signOut = () => {
    deleteSession(() => {
      setAuthStatus('Loading')
    })
  }

  return [authStatus, { setAuthStatus, signIn, signUp, verify, signOut }]
}

export default useAuth
