import logo from '../assets/logo.svg'
import '../styles/App.css'
import { Outlet, Link } from 'react-router-dom'

const Top = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Link to="login" className="App-link">
          Go To Login
        </Link>
        <Link to="signIn" className="App-link">
          Go To signIn
        </Link>
        <Link to="signOut" className="App-link">
          Go To signOut
        </Link>
        <Outlet />
      </header>
    </div>
  )
}

export default Top
