import { styled } from '@mui/material/styles'
import { BaseSyntheticEvent, FormHTMLAttributes } from 'react'

type PropsCustomForm = FormHTMLAttributes<HTMLFormElement> & {
  onSubmit: (
    e?: BaseSyntheticEvent<object, unknown, unknown> | undefined
  ) => Promise<void>
}

const CustomForm = ({
  children,
  ...props
}: React.PropsWithChildren<PropsCustomForm>) => {
  const Form = styled('form')(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(1)
  }))

  return (
    <Form noValidate {...props}>
      {children}
    </Form>
  )
}

export default CustomForm
