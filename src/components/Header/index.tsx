import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import theme from '@/theme/theme'

const Header = () => (
  <Paper component="header" elevation={2} sx={{ marginBottom: '3rem' }}>
    <Typography
      component="h1"
      variant="h1"
      sx={{ margin: theme.spacing(3, 0), textAlign: 'center', color: 'deeppink', textShadow: '1px 1px darkmagenta' }}
    >
      The Ultimate Form
    </Typography>
  </Paper>
)

export default Header
