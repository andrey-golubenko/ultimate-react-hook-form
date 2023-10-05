import { Outlet } from 'react-router-dom'
import Header from '../Header'

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className="container">{new Date().getFullYear()}</footer>
    </>
  )
}

export default Layout
