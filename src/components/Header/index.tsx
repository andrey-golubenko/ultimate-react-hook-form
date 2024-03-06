import { FC } from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import theme from '@/theme/theme'
import Stepper from '@/Components/Stepper'

const Header: FC<{ onStepChange?: () => void }> = ({ onStepChange }) => (
  <Stack component="header" sx={{ marginBottom: '3rem' }}>
    <Paper variant="outlined">
      <Typography
        component="h2"
        variant="h2"
        sx={{
          margin: theme.spacing(3, 0),
          textAlign: 'center',
          color: 'deeppink',
          textShadow: '1px 1px darkmagenta'
        }}
      >
        The Ultimate Form
      </Typography>
    </Paper>
    <Paper
      component="div"
      elevation={1}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '.7rem 0'
      }}
    >
      <Stepper onStepChange={onStepChange} />
    </Paper>
  </Stack>
)

export default Header
