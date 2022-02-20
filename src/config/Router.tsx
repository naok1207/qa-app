import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Top from '../containers/Top'
import Login from '../containers/auth/Login'
import SignIn from '../containers/auth/SignIn'
import SignOut from '../containers/auth/SignOut'
import SignUp from '../containers/auth/SignUp'
import MyPage from 'containers/users/MyPage'
import Admin from 'containers/admin/Admin'
import QA from 'containers/QA/QA'
import BaseLayout from 'conponents/BaseLayout'
import UsersEdit from 'containers/users/UsersEdit'
import QAIndex from 'containers/QA/QAIndex'
import QAForm from 'containers/QA/Questions/QAForm'
import QuestionShow from 'containers/QA/Questions/QuestionShow'
import Verification from 'containers/auth/Verification'

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="login" element={<Login />} />
      <Route path="signIn" element={<SignIn />} />
      <Route path="signOut" element={<SignOut />} />
      <Route path="signUp" element={<SignUp />} />
      <Route path="verification" element={<Verification />} />
      <Route element={<BaseLayout />}>
        <Route path="mypage" element={<MyPage />} />
        <Route path="users">
          <Route path="edit" element={<UsersEdit />} />
        </Route>
        <Route path="admin" element={<Admin />} />
        <Route path="qa" element={<QA />}>
          <Route index element={<QAIndex />} />
          <Route path="new" element={<QAForm />} />
          <Route path=":questionId" element={<QuestionShow />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
)

export default Router
