import Avatar from '@mui/material/Avatar'
import ImageIcon from '@mui/icons-material/Image'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import useUsers from 'hooks/useUsers'
import { useEffect } from 'react'
import ListItemText from '@mui/material/ListItemText'
import Title from '../BaseLayer/Title'

const Users = () => {
  const [users] = useUsers()

  useEffect(() => {
    console.log(users)
  }, [users])

  return (
    <>
      <Title>ユーザ一覧</Title>
      <ul>
        {users &&
          users.map((user) => {
            return (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.name} secondary={user.id} />
              </ListItem>
            )
          })}
      </ul>
    </>
  )
}

export default Users
