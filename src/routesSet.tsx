import PersonalInfo from './pages/PersonalInfo'
import Cotacts from './pages/Contacts'
import Files from './pages/Files'
import Result from './pages/Result'
import { Paths } from './constants'
import Password from './pages/Password'
import NotFoudPage from './pages/NotFoudPage'
import ErrorPage from './pages/ErrorPage'

type SingleRoute = {
  index?: boolean
  path: string
  component: () => JSX.Element | null
  errorComponent: () => JSX.Element | null
}

const routesSet: SingleRoute[] = [
  {
    index: true,
    path: Paths.root,
    component: PersonalInfo,
    errorComponent: ErrorPage
  },
  {
    index: true,
    path: Paths.contacts,
    component: Cotacts,
    errorComponent: ErrorPage
  },
  {
    index: true,
    path: Paths.password,
    component: Password,
    errorComponent: ErrorPage
  },
  {
    index: true,
    path: Paths.files,
    component: Files,
    errorComponent: ErrorPage
  },
  {
    index: true,
    path: Paths.result,
    component: Result,
    errorComponent: ErrorPage
  },
  {
    path: Paths.notFound,
    component: NotFoudPage,
    errorComponent: ErrorPage
  }
]

export default routesSet
