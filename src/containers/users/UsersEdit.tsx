import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Copyright from 'conponents/Copyright'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import Tooltip from '@mui/material/Tooltip'
import { useUserContext } from 'context/UserContext'
import { useEffect, useState } from 'react'
import useUploadImage from 'hooks/useUploadImage'
import { updateUser } from 'repositories/UserRepository'
import PersonIcon from '@mui/icons-material/Person'

const UsersEdit = () => {
  const { currentUser } = useUserContext()
  const [newAvatarUrl, uploadNewAvatar] = useUploadImage()
  const [image, setImage] = useState<File>()
  const [imageUrl, setImageUrl] = useState<string>()

  useEffect(() => {
    if (!currentUser) return
    setImageUrl(currentUser.avatar)
    // setImageUrl("https://avatars.githubusercontent.com/u/49236312?v=4");
  }, [currentUser])

  const handleSubmit = async () => {
    if (!currentUser) return
    if (image) {
      await uploadNewAvatar(
        image,
        async (url) => {
          await updateUser(currentUser, { avatar: url })
        },
        `/avatar/${currentUser.id}`,
      )
      setImageUrl(newAvatarUrl)
      setImage(undefined)
    }
  }

  const handleInputAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget
    if (!target.files) return
    const image = target.files[0]
    var blobUrl = window.URL.createObjectURL(image)
    setImage(image)
    setImageUrl(blobUrl)
  }

  return (
    <>
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
          <Typography component="h1" variant="h5">
            Edit
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <InputLabel
                  htmlFor="user-icon"
                  sx={{
                    cursor: 'pointer',
                    width: 100,
                    height: 100,
                    mx: 'auto',
                    mb: 3,
                    borderRadius: '50%',
                  }}
                >
                  <Tooltip title="change avatar">
                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                        objectFit: 'cover',
                        bgcolor: 'secondary.main',
                      }}
                      src={imageUrl}
                    >
                      <PersonIcon sx={{ width: 90, height: 90 }} />
                    </Avatar>
                  </Tooltip>
                </InputLabel>
                <Input
                  type="file"
                  name="avatar"
                  id="user-icon"
                  sx={{ display: 'none' }}
                  onChange={handleInputAvatar}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              disabled={!image}
              sx={{ mt: 3, mb: 2 }}
            >
              更新
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </>
  )
}

export default UsersEdit
