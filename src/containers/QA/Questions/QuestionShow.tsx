import { Container, CssBaseline, Divider } from '@mui/material'
import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { get, Question } from 'repositories/QuestionRepository'
import Answers from './Answers'
import NewAnswer from './NewAnswer'

const QuestionShow = () => {
  const { questionId } = useParams()
  const [question, setQuestion] = useState<Question>()

  useEffect(() => {
    if (!questionId) return
    const setUpQuestion = async () => {
      if (!questionId) return
      const doc = await get(questionId)
      setQuestion(doc)
    }
    setUpQuestion()
  }, [questionId])

  if (!questionId || !question) return <></>

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ backgroundColor: 'background.paper' }}
    >
      <CssBaseline />
      <Box sx={{ p: 2, backgroundColor: 'background.paper' }}>
        <Typography variant="h4" component="h3">
          {question.title}
        </Typography>
        <Divider variant="middle" />
        <Typography variant="body1" gutterBottom>
          {question.content}
        </Typography>
      </Box>
      <Answers questionId={questionId} />
      <NewAnswer questionId={questionId} />
    </Container>
  )
}

export default QuestionShow
