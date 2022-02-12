import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import dateFormat from 'dateformat'
import { useEffect, useState } from 'react'
import { observe, Answer } from 'repositories/QuestionAnswerRepository'

type Props = {
  questionId: string
}

const AnswerItem = ({ answer }: { answer: Answer }) => (
  <ListItem alignItems="flex-start">
    <ListItemText
      primary={answer.answer}
      secondary={dateFormat(answer.createdAt, 'yyyy年 m月 d日 H時 M分')}
    />
  </ListItem>
)

const Answers = ({ questionId }: Props) => {
  const [answers, setAnswers] = useState<Answer[]>([])

  useEffect(() => {
    const unsubsucribe = observe(questionId, (answersSnapshot) =>
      setAnswers(answersSnapshot),
    )
    return unsubsucribe
  }, [questionId])

  return (
    <>
      {answers.map((answer, index) => (
        <>
          <AnswerItem answer={answer} />
          {answers.length - 1 !== index && <Divider variant="middle" />}
        </>
      ))}
    </>
  )
}

export default Answers
