import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import { useUserContext } from 'context/UserContext'
import { useState } from 'react'
import { create } from 'repositories/QuestionAnswerRepository'

type Props = {
  questionId: string
}

const NewAnswer = ({ questionId }: Props) => {
  const { currentUser } = useUserContext()
  const [answer, setAnswer] = useState<string>('')

  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!currentUser || !answer) return
    create(questionId, currentUser.id, answer)
    setAnswer('')
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="answer"
              label="回答"
              name="answer"
              autoComplete="回答"
              multiline
              rows={4}
              value={answer}
              onChange={handleChangeAnswer}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          作成
        </Button>
      </Box>
    </Container>
  )
}

export default NewAnswer
