import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Users from 'containers/admin/Users'
import React from 'react'

const Custom = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={6}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Users />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Custom
