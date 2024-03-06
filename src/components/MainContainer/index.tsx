import { FC } from 'react'
import Container from '@mui/material/Container'
import { useLocation } from 'react-router-dom'
import theme from '@/theme/theme'
import { PATHS } from '@/constants'

const MainContainer: FC<React.PropsWithChildren> = ({ children, ...props }) => {
  const { pathname } = useLocation()
  const largeView = pathname === PATHS.result || pathname === PATHS.education

  return (
    <Container
      component="main"
      maxWidth={largeView ? 'sm' : 'xs'}
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
