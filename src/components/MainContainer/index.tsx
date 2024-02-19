import Container from '@mui/material/Container'
import { useLocation } from 'react-router-dom'
import theme from '@/theme/theme'
import { PATHS } from '@/constants'

const MainContainer = ({ children, ...props }: React.PropsWithChildren) => {
  const { pathname } = useLocation()
  const pathnameResult =
    // pathname === PATHS.result || pathname === PATHS.personal_information
    pathname === PATHS.result

  return (
    <Container
      component="main"
      maxWidth={pathnameResult ? 'sm' : 'xs'}
      sx={{
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(15),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
      {...props}
    >
      {children}
    </Container>
  )
}

export default MainContainer
