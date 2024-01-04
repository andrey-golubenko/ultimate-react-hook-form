import Button from '@mui/material/Button'
import React, { FC } from 'react'
import theme from '@/theme/theme'

interface IPrimaryButton extends React.PropsWithChildren {
  onClick?: () => void
}

const PrimaryButton: FC<IPrimaryButton> = ({ children, ...props }: React.PropsWithChildren) => (
  <Button
    variant="contained"
    fullWidth
    type="submit"
    color="primary"
    sx={{ margin: theme.spacing(3, 0, 2) }}
    {...props}
  >
    {children}
  </Button>
)

export default PrimaryButton
