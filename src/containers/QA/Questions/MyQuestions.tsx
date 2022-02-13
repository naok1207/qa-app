import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import { useUserContext } from 'context/UserContext'
import dateFormat from 'dateformat'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  deleteQuestion,
  observeOwn,
  Question,
} from 'repositories/QuestionRepository'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

const QuestionItem = ({
  userId,
  question,
}: {
  userId: string
  question: Question
}) => (
  <ListItem alignItems="flex-start">
    <Link
      to={`/qa/${question.id}`}
      style={{ textDecoration: 'none', width: 490 }}
    >
      <ListItemText
        primary={
          <Box sx={{ display: 'flex' }}>
            <Typography component="span" variant="body2" color="text.primary">
              {question.title}
            </Typography>
            <Typography
              sx={{ ml: 'auto' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {dateFormat(question.createdAt, 'yyyy年 m月 d日 H時 M分')}
            </Typography>
          </Box>
        }
        secondary={question.content}
      />
    </Link>
    <Button onClick={() => deleteQuestion(userId, question.id)}>
      <DeleteForeverIcon />
    </Button>
  </ListItem>
)

const MyQuestions = () => {
  const { currentUser } = useUserContext()
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    if (!currentUser) return
    const unsubscribe = observeOwn(currentUser.id, (snapshotQuestions) => {
      setQuestions(snapshotQuestions)
    })
    return unsubscribe
  }, [currentUser])

  if (!currentUser) return <></>

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {questions.map((question, index) => (
        <Box key={question.id}>
          <QuestionItem userId={currentUser.id} question={question} />
          {questions.length - 1 !== index && <Divider variant="middle" />}
        </Box>
      ))}
    </List>
  )
}

export default MyQuestions
