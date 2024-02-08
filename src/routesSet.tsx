import PersonalInfo from './pages/PersonalInfo'
import Cotacts from './pages/Contacts'
import Files from './pages/Files'
import Result from './pages/Result'
import { PATHS } from './constants'
import Password from './pages/Password'
import NotFoudPage from './pages/NotFoudPage'
import ErrorPage from './pages/ErrorPage'
import Video from './pages/Video'

type SingleRoute = {
  index?: boolean
  path: string
  component: () => JSX.Element | null
  errorComponent: () => JSX.Element | null
}

const routesSet: SingleRoute[] = [
  {
    index: true,
    path: PATHS.root,
    component: PersonalInfo,
    errorComponent: ErrorPage
  },
  {
    index: true,
    path: PATHS.contacts,
    component: Cotacts,
    errorComponent: ErrorPage
  },
  {
    index: true,
    path: PATHS.password,
    component: Password,
    errorComponent: ErrorPage
  },
  {
    index: true,
    path: PATHS.files,
    component: Files,
    errorComponent: ErrorPage
  },
  {
    index: true,
    path: PATHS.video,
    component: Video,
    errorComponent: ErrorPage
  },
  {
    index: true,
    path: PATHS.result,
    component: Result,
    errorComponent: ErrorPage
  },
  {
    path: PATHS.notFound,
    component: NotFoudPage,
    errorComponent: ErrorPage
  }
]

export default routesSet
