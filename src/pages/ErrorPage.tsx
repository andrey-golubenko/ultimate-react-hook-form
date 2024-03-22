import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError
} from 'react-router-dom'
import { Button, Stack, Typography } from '@mui/material'
import { ErrorPageType } from '@/types'

type ErorrType = {
  [x: string]: unknown
  status: number
  statusText: string
}

const ErrorPage = ({ error }: ErrorPageType) => {
  const routerError = useRouteError() as ErorrType
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  if (isRouteErrorResponse(routerError)) {
    return (
      <Stack alignItems="center">
        <Typography variant="h2">Error status: {routerError.status}</Typography>
        <Typography variant="h4">{routerError.data.message}</Typography>
        <Typography variant="h5">{routerError.data.reason}</Typography>
        <Stack padding={5}>
          <Button variant="outlined" onClick={goBack}>
            Go Back
          </Button>
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack alignItems="center">
      <Typography variant="h2" marginBottom="2rem">
        Somthing went wrong! {error?.name}
      </Typography>
      <Typography variant="h4">
        {`${error?.message.charAt(0).toUpperCase()}${error?.message.slice(1)}`}
      </Typography>
      <Stack padding={5}>
        <Button variant="outlined" onClick={goBack}>
          Go Back
        </Button>
      </Stack>
    </Stack>
  )
}

export default ErrorPage
