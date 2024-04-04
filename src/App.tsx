import './App.css'
import { Suspense, useRef } from 'react'
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import Layout from '@/Components/Layout'
import RouteComponent from '@/Components/RouteComponent'
import FormSkeleton from '@/Components/FormComponents/FormSkeleton'
import router from '@/router'

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
              errorElement={
                <Suspense fallback={<FormSkeleton />}>
                  <ErrorComponent />
                </Suspense>
              }
              element={
                <RouteComponent
                  path={path}
                  component={Component}
                  ref={buttonRef}
                />
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
