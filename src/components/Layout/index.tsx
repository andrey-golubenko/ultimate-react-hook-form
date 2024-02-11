import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Header from '../Header'
import Footer from '../Footer'
import MainContainer from '../MainContainer'

const Layout: FC<{ onStepChange: () => void }> = ({ onStepChange }) => (
  <Stack sx={{ width: '100vw', minHeight: '100vh' }}>
    <Header onStepChange={onStepChange} />
    <MainContainer>
      <Outlet />
    </MainContainer>
    <Footer />
  </Stack>
)

export default Layout
