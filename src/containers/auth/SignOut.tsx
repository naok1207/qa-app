import { useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Copyright from 'conponents/Copyright'
import useAuth from 'hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from 'context/UserContext'

const theme = createTheme()

const SignOut = () => {
  const { currentUser, authActions } = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) return
    navigate('/signIn')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  const handlePressSignOut = () => {
    authActions?.signOut()
  }

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
            Sign Out
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handlePressSignOut}
            >
              Sign Out
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/mypage" variant="body2">
                  go to mypage
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}

export default SignOut
