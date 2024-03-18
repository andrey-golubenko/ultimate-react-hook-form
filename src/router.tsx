import { FC, ForwardRefExoticComponent, RefAttributes } from 'react'
import PersonalInfo from '@/pages/PersonalInfo'
import Cotacts from '@/pages/Contacts'
import Files from '@/pages/Files'
import Result from '@/pages/Result'
import { PATHS } from '@/constants'
import Password from '@/pages/Password'
import NotFoudPage from '@/pages/NotFoudPage'
import ErrorPage from '@/pages/ErrorPage'
import Video from '@/pages/Video'
import Education from '@/pages/Education'
import { SaveData } from './types'

type SingleRoute = {
  index?: boolean
  path: string
  component:
    | ForwardRefExoticComponent<SaveData & RefAttributes<unknown>>
    | (() => JSX.Element | null)
    | FC
  errorComponent: (() => JSX.Element | null) | FC
}

const router: SingleRoute[] = [
  {
    index: true,
    path: PATHS.personal_information,
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
    path: PATHS.education,
    component: Education,
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

export default router
