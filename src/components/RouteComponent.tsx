import { forwardRef, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { RouteElement } from '@/types'
import ErrorPage from '@/pages/ErrorPage'
import { PATHS } from '@/constants'
import FormSkeleton from '@/Components/FormComponents/FormSkeleton'

interface RouteComponentProps {
  path: string
  component: RouteElement
}

const RouteComponent: React.ForwardRefExoticComponent<
  RouteComponentProps & React.RefAttributes<unknown>
> = forwardRef(({ path, component: Component }, ref) => (
  <ErrorBoundary FallbackComponent={ErrorPage} key={path}>
    <Suspense fallback={<FormSkeleton />}>
      {path !== PATHS.result ? <Component ref={ref} /> : <Component />}
    </Suspense>
  </ErrorBoundary>
))

export default RouteComponent
