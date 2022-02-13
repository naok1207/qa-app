import { Box, Button, Container } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'
import Questions from './Questions/Questions'
import MyQuestions from './Questions/MyQuestions'

const QAIndex = () => {
  return (
    <Container sx={{ display: 'flex' }}>
      <Box sx={{ width: 500, mx: 1 }}>
        <Link to="/qa/new" style={{ textDecoration: 'none' }}>
          <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            <AddIcon />
            質問作成
          </Button>
        </Link>
        <Questions />
      </Box>
      <Box sx={{ width: 500, mx: 1 }}>
        <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled>
          MY Questions
        </Button>
        <MyQuestions />
      </Box>
    </Container>
  )
}

export default QAIndex
