import {
  BaseSyntheticEvent,
  FC,
  FormHTMLAttributes,
  useEffect,
  useState
} from 'react'
import { styled } from '@mui/material/styles'
import { useLocation, useNavigate } from 'react-router-dom'
import { getDirection } from '@/helpers'
import { useData } from '@/HOC/DataContex'

type PropsCustomForm = FormHTMLAttributes<HTMLFormElement> & {
  onSubmit: (
    e?: BaseSyntheticEvent<object, unknown, unknown> | undefined
  ) => Promise<void>
}

const CustomForm: FC<PropsCustomForm> = ({ children, onSubmit, ...props }) => {
  const Form = styled('form')(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(1)
  }))

  const { formData, setFormValue } = useData()
  const { isDataReceived } = formData

  const { pathname } = useLocation()

  const navigate = useNavigate()

  const [navigateTo, setNavigateTo] = useState<string>('')

  const onCustomSubmit = (
    event: BaseSyntheticEvent<object, unknown, unknown> | undefined
  ) => {
    const eventSubmitter =
      (event?.nativeEvent as HTMLFormElement)?.submitter?.id || 'next'
    const url = getDirection(pathname, eventSubmitter)

    setNavigateTo(url)

    event?.preventDefault()

    onSubmit()
  }

  useEffect(() => {
    if (isDataReceived) {
      setFormValue({ isDataReceived: false })
      navigate(navigateTo)
    }
  }, [isDataReceived, navigate, navigateTo, setFormValue])

  return (
    <Form noValidate {...props} onSubmit={onCustomSubmit}>
      {children}
    </Form>
  )
}

export default CustomForm
