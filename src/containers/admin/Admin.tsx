import { useTitle } from 'conponents/BaseLayout'
import { useUserContext } from 'context/UserContext'
import Custom from './Custom'

const Admin = () => {
  useTitle('Admin')
  const { currentUser } = useUserContext()

  if (!currentUser?.admin) return <>{'not admin'}</>

  return <Custom />
}

export default Admin
