import { Cancel, CheckCircle } from '@mui/icons-material'
import theme from '../theme/theme'

const CheckIcon = ({ valid }: { valid: boolean }) =>
  valid ? (
    <CheckCircle
      sx={{
        color: theme.palette.success.main,
        marginRight: 1,
        fontSize: 'medium'
      }}
    />
  ) : (
    <Cancel
      sx={{
        color: theme.palette.error.main,
        marginRight: 1,
        fontSize: 'medium'
      }}
    />
  )

export default CheckIcon
