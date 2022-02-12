import { Box, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'
import Questions from './Questions/Questions'

const QAIndex = () => {
  return (
    <Box sx={{ width: 500, mx: 'auto' }}>
      <Link to="/qa/new" style={{ textDecoration: 'none' }}>
        <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          <AddIcon />
          質問作成
        </Button>
      </Link>
      <Questions />
    </Box>
  )
}

export default QAIndex
