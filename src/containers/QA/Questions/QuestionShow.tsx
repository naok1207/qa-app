import { Container, CssBaseline, Divider } from '@mui/material'
import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { get, Question } from 'repositories/QuestionRepository'

const QuestionShow = () => {
  const { questionId } = useParams()
  const [question, setQuestion] = useState<Question>()

  useEffect(() => {
    setUpQuestion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId])

  const setUpQuestion = async () => {
    if (!questionId) return
    const doc = await get(questionId)
    setQuestion(doc)
  }

  if (!question) return <></>

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ backgroundColor: 'background.paper' }}
    >
      <CssBaseline />
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" component="h3">
          {question.title}
        </Typography>
        <Divider variant="middle" />
        <Typography variant="body1" gutterBottom>
          {question.content}
        </Typography>
      </Box>
    </Container>
  )
}

export default QuestionShow
