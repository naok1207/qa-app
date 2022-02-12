import { useTitle } from 'conponents/BaseLayout'
import { Outlet } from 'react-router-dom'

const QA = () => {
  useTitle('QA')

  return <Outlet />
}

export default QA
