import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'

const QAIndex = () => {
  return (
    <Link to="/qa/new" style={{ textDecoration: 'none' }}>
      <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        <AddIcon />
        質問作成
      </Button>
    </Link>
  )
}

export default QAIndex
