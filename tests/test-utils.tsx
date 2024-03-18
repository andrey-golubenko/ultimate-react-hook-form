import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FC, PropsWithChildren, ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'

const Wrapper: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
)

const customRender = (ui: ReactElement) => ({
  user: userEvent.setup(),
  ...render(ui, { wrapper: Wrapper })
})

export default customRender
