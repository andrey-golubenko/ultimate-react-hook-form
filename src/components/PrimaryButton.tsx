import { forwardRef, useImperativeHandle, useRef } from 'react'
import Button from '@mui/material/Button'
import theme from '@/theme/theme'

interface INextButton extends React.PropsWithChildren {
  onClick?: (event: React.MouseEvent) => Promise<void>
  ref?: React.ForwardedRef<unknown>
  buttonId?: string
}

const PrimaryButton: React.ForwardRefExoticComponent<INextButton> = forwardRef(
  (
    {
      children,
      buttonId = 'submit',
      ...props
    }: React.PropsWithChildren & { buttonId?: string },
    ref
  ) => {
    const buttonLowerRef = useRef<HTMLButtonElement>(null)

    useImperativeHandle(ref, () => ({
      click: () => {
        buttonLowerRef?.current?.click()
      }
    }))

    return (
      <Button
        id={buttonId}
        variant="contained"
        type="submit"
        color="primary"
        ref={buttonLowerRef}
        sx={{ margin: theme.spacing(3, 0, 2), width: '30%' }}
        {...props}
      >
        {children}
      </Button>
    )
  }
)

export default PrimaryButton
