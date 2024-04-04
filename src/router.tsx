import { FC, lazy } from 'react'
import { PATHS } from '@/constants'
import { ErrorPageType, RouteElement } from './types'

const Education = lazy(() => import('@/pages/Education'))
const Video = lazy(() => import('@/pages/Video'))
const ErrorPage = lazy(() => import('@/pages/ErrorPage'))
const NotFoudPage = lazy(() => import('@/pages/NotFoudPage'))
const Password = lazy(() => import('@/pages/Password'))
const Result = lazy(() => import('@/pages/Result'))
const Files = lazy(() => import('@/pages/Files'))
const Cotacts = lazy(() => import('@/pages/Contacts'))
const PersonalInfo = lazy(() => import('@/pages/PersonalInfo'))

type SingleRoute = {
  index?: boolean
  path: string
  component: RouteElement
  errorComponent: (({ error }: ErrorPageType) => JSX.Element | null) | FC
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
