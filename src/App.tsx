import './App.css'
import { useRef } from 'react'
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import Layout from '@/Components/Layout'
import router from '@/router'
import { PATHS } from '@/constants'

function App() {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const onStepChange = () => {
    buttonRef?.current?.click()
  }

  const AppRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout onStepChange={onStepChange} />}>
        {router.map(({ index = false, path, component: Component }) => (
          <Route
            key={path}
            index={index}
            path={path}
            element={
              path !== PATHS.result ? (
                <Component ref={buttonRef} />
              ) : (
                <Component />
              )
            }
          />
        ))}
      </Route>
    )
  )

  return <RouterProvider router={AppRouter} />
}

export default App
