import { firebaseAuth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import useAuth, { AuthActions, AuthStatus } from 'hooks/useAuth'
import { createContext, useState, useContext, useEffect } from 'react'

import { User } from 'repositories/UserRepository'
import { get } from 'repositories/AuthRepository'

type ContextType = {
  currentUser: User | null
  authActions?: AuthActions
  authStatus?: AuthStatus
}

const UserContext = createContext<ContextType>({ currentUser: null })

type Props = {
  children: any
}

export const useUserContext = () => {
  return useContext(UserContext)
}

export const UserProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [authStatus, authActions] = useAuth()

  const value = { currentUser, authStatus, authActions }

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (userAuth) => {
      if (!userAuth) {
        setCurrentUser(null)
        setLoading(false)
      } else {
        const unsubscribed = get(userAuth.uid, (user) => {
          setCurrentUser(user)
          authActions.setAuthStatus('SignedIn')
          setLoading(false)
        })
        return unsubscribed
      }
    })
  }, [authActions, authStatus])

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  )
}
