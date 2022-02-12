import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import dateFormat from 'dateformat'
import { useEffect, useState } from 'react'
import { gets, Question } from 'repositories/QuestionRepository'

const QuestionItem = ({ question }: { question: Question }) => (
  <ListItem key={question.id} alignItems="flex-start">
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
  </ListItem>
)

const Questions = () => {
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    setUpQuestion()
  }, [])

  const setUpQuestion = async () => {
    const docs = await gets()
    setQuestions(docs)
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {questions.map((question, index) => (
        <>
          <QuestionItem key={question.id} question={question} />
          {questions.length - 1 !== index && <Divider variant="middle" />}
        </>
      ))}
    </List>
  )
}

export default Questions
