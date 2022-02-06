import { useEffect, useState } from 'react'
import { getUsers, User } from 'repositories/UserRepository'

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const unsubscribe = getUsers((userDocs: User[]) => {
      setUsers(userDocs)
    })
    return unsubscribe
  }, [])

  return [users]
}

export default useUsers
