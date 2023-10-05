import { ActionFunction } from 'react-router-dom'
import Step1 from './pages/Step1'
import Step2 from './pages/Step2'
import Step3 from './pages/Step3'
import Result from './pages/Result'

export type LoaderFunc = ({
  request,
  params
}: {
  request: unknown | undefined
  params: unknown | undefined
}) => Promise<unknown>

type TSingleRoute = {
  index?: boolean
  path: string
  component: () => JSX.Element | null
  loaderFunc?: LoaderFunc
  errorComponent?: (() => JSX.Element | null) | (() => unknown)
  action?: ActionFunction
}

const routesSet: TSingleRoute[] = [
  {
    index: true,
    path: '/',
    component: Step1
  },
  {
    index: true,
    path: '/step2',
    component: Step2
  },
  {
    index: true,
    path: '/step3',
    component: Step3
  },
  {
    index: true,
    path: '/result',
    component: Result
  }
]

export default routesSet
