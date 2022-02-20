import { Box, Typography } from '@mui/material'
import { useUserContext } from 'context/UserContext'
import { firebaseAuth } from '../../firebase'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Verification = () => {
  const { authStatus, authActions } = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!firebaseAuth.currentUser?.emailVerified) return
    navigate('/mypage')
  }, [authStatus, navigate])

  useEffect(() => {
    if (!authStatus) return
    authActions?.verify()
  }, [authActions, authStatus])

  if (!authStatus) return <></>

  return (
    <Box>
      <Typography variant="h1">Verification</Typography>
    </Box>
  )
}

export default Verification
