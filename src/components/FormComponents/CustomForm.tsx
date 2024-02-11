import { styled } from '@mui/material/styles'
import { BaseSyntheticEvent, FormHTMLAttributes } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getDirection } from '@/helpers'

type PropsCustomForm = FormHTMLAttributes<HTMLFormElement> & {
  onSubmit: (
    e?: BaseSyntheticEvent<object, unknown, unknown> | undefined
  ) => Promise<void>
}

const CustomForm = ({
  children,
  onSubmit,
  ...props
}: React.PropsWithChildren<PropsCustomForm>) => {
  const Form = styled('form')(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(1)
  }))

  const { pathname } = useLocation()

  const navigate = useNavigate()

  const onCustomSubmit = (
    event: BaseSyntheticEvent<object, unknown, unknown> | undefined
  ) => {
    const eventSubmitter = (event?.nativeEvent as HTMLFormElement)?.submitter.id
    const url = getDirection(pathname, eventSubmitter)
    event?.preventDefault()
    onSubmit()

    navigate(url)
  }

  return (
    <Form noValidate {...props} onSubmit={onCustomSubmit}>
      {children}
    </Form>
  )
}

export default CustomForm
