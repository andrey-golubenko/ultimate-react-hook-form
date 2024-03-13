import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Header from '@/Components/Header'
import Footer from '@/Components/Footer'
import MainContainer from '@/Components/MainContainer'
import { IStepChange } from '@/types'

const Layout: FC<IStepChange> = ({ onStepChange }) => (
  <Stack sx={{ width: '100vw', minHeight: '100vh' }}>
    <Header onStepChange={onStepChange} />
    <MainContainer>
      <Outlet />
    </MainContainer>
    <Footer />
  </Stack>
)

export default Layout
