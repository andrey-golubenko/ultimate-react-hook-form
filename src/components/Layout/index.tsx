import { Outlet } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Header from '../Header'
import Footer from '../Footer'
import MainContainer from '../MainContainer'

const Layout = () => (
  <Stack sx={{ width: '100vw', minHeight: '100vh' }}>
    <Header />
    <MainContainer>
      <Outlet />
    </MainContainer>
    <Footer />
  </Stack>
)

export default Layout
