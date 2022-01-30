import { UserProvider } from 'context/UserContext'
import Router from '../config/Router'

const App = () => {
  return (
    <UserProvider>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <Router />
    </UserProvider>
  )
}

export default App
