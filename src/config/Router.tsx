import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Top from '../containers/Top'
import Login from '../containers/auth/Login'
import SignIn from '../containers/auth/SignIn'
import SignOut from '../containers/auth/SignOut'
import SignUp from '../containers/auth/SignUp'
import MyPage from 'containers/MyPage'
import Admin from 'containers/admin/Admin'
import QA from 'containers/QA/QA'
import BaseLayout from 'conponents/BaseLayout'

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="login" element={<Login />} />
      <Route path="signIn" element={<SignIn />} />
      <Route path="signOut" element={<SignOut />} />
      <Route path="signUp" element={<SignUp />} />
      <Route element={<BaseLayout />}>
        <Route path="mypage" element={<MyPage />} />
        <Route path="admin" element={<Admin />} />
        <Route path="qa" element={<QA />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default Router
