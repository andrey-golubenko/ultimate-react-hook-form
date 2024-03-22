import './App.css'
import { useRef } from 'react'
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import Layout from '@/Components/Layout'
import router from '@/router'
import { PATHS } from '@/constants'
import ErrorPage from './pages/ErrorPage'

function App() {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const onStepChange = () => {
    buttonRef?.current?.click()
  }

  const AppRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout onStepChange={onStepChange} />}>
        {router.map(
          ({
            index = false,
            path,
            component: Component,
            errorComponent: ErrorComponent
          }) => (
            <Route
              key={path}
              index={index}
              path={path}
              errorElement={<ErrorComponent />}
              element={
                path !== PATHS.result ? (
                  <ErrorBoundary FallbackComponent={ErrorPage} key={path}>
                    <Component ref={buttonRef} />
                  </ErrorBoundary>
                ) : (
                  <Component />
                )
              }
            />
          )
        )}
      </Route>
    )
  )

  return <RouterProvider router={AppRouter} />
}

export default App
