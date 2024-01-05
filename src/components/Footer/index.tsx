import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

const Footer = () => (
  <Paper
    component="footer"
    elevation={7}
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
