import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from '@/Components/Layout'
import routesSet from './routesSet'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {routesSet.map(({ index = false, path, component: Component }) => (
        <Route key={path} index={index} path={path} element={<Component />} />
      ))}
    </Route>
  )
)

export default router
