import { FC } from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

const Footer: FC = () => (
  <Paper
    component="footer"
    elevation={8}
    sx={{
      py: 3,
      px: 2,
      mt: 'auto'
    }}
  >
    <Typography variant="body2">
      {'Copyright © '}
      {new Date().getFullYear()}
    </Typography>
  </Paper>
)

export default Footer
