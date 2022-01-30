import { useState, useEffect } from 'react'
import BacktToTop from 'conponents/BackToTop'
import { db, firebaseAuth } from '../../firebase'
import { setDoc, doc } from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'

const Login = () => {
  const [values, setValues] = useState({
    user_name: '',
    email: '',
  })

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    const value = target.value
    setValues({
      user_name: value,
      email: value + '@example.com',
    })
  }

  useEffect(() => {
    console.log(values)
  }, [values])

  const signUp = () => {
    createUserWithEmailAndPassword(firebaseAuth, values.email, 'hogehoge')
      .then((userCredential) => {
        console.log('success', userCredential)
        createUser(userCredential.user.uid)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }

  const createUser = async (uid: string) => {
    try {
      await setDoc(doc(db, 'users', uid), {
        name: values.user_name,
        email: values.email,
      })
      console.log('Created User name: ', uid)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  const signIn = () => {
    signInWithEmailAndPassword(firebaseAuth, values.email, 'hogehoge')
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }

  return (
    <>
      <h1>Login</h1>
      <BacktToTop />
      <button onClick={signUp}>Sign up</button>
      <button onClick={signIn}>Sign In</button>

      <input
        type="text"
        name="user_name"
        defaultValue={values.user_name}
        onChange={handleNameInputChange}
      />
    </>
  )
}

export default Login
