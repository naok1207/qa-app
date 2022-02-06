import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Copyright from 'conponents/Copyright'
import { useUserContext } from 'context/UserContext'
import { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { Link, useNavigate } from 'react-router-dom'
import { useTitle } from 'conponents/BaseLayout'

const theme = createTheme()

const MyPage = () => {
  useTitle('MY PAGE')
  const { currentUser } = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) navigate('/signIn')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  if (!currentUser) return <></>

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            MyPage
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Typography component="div">
              <Box sx={{ textAlign: 'center', m: 1 }}>{currentUser.name}</Box>
              <Box sx={{ textAlign: 'center', m: 1 }}>{currentUser.email}</Box>
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Grid
                container
                justifyContent="center"
                flexDirection="column"
                textAlign="center"
              >
                <Link to="/signout">go to out</Link>
                <Link to="/admin">管理者ページ</Link>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}

export default MyPage
