import PersonalInfo from './pages/PersonalInfo'
import Cotacts from './pages/Cotacts'
import Files from './pages/Files'
import Result from './pages/Result'
import paths from './constants'

type TSingleRoute = {
  index?: boolean
  path: string
  component: () => JSX.Element | null
}

const routesSet: TSingleRoute[] = [
  {
    index: true,
    path: paths.root,
    component: PersonalInfo
  },
  {
    index: true,
    path: paths.contacts,
    component: Cotacts
  },
  {
    index: true,
    path: paths.files,
    component: Files
  },
  {
    index: true,
    path: paths.result,
    component: Result
  }
]

export default routesSet
