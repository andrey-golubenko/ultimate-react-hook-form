import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError
} from 'react-router-dom'

import { Button, Stack, Typography } from '@mui/material'

type ErorrType = {
  [x: string]: unknown
  status: number
  statusText: string
}

const ErrorPage = () => {
  const error = useRouteError() as ErorrType
  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  if (isRouteErrorResponse(error)) {
    return (
      <Stack alignItems="center">
        <Typography variant="h2">Error status: {error.status}</Typography>
        <Typography variant="h4">{error.data.message}</Typography>
        <Typography variant="h5">{error.data.reason}</Typography>
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
      <Typography variant="h2">Somthing goes rong!</Typography>
    </Stack>
  )
}

export default ErrorPage
