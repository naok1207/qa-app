import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Top from '../containers/Top'
import Login from '../containers/auth/Login'
import SignIn from '../containers/auth/SignIn'
import SignOut from '../containers/auth/SignOut'
import SignUp from '../containers/auth/SignUp'
import MyPage from 'containers/MyPage'

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="login" element={<Login />} />
      <Route path="signIn" element={<SignIn />} />
      <Route path="signOut" element={<SignOut />} />
      <Route path="signUp" element={<SignUp />} />
      <Route path="mypage" element={<MyPage />} />
    </Routes>
  </BrowserRouter>
)

export default Router