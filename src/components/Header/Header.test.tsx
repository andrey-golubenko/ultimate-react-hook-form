import { screen, waitFor } from '@testing-library/react'
import { Route, Routes } from 'react-router-dom'
import customRender from '~/test-utils'
import router from '@/router'
import Header from '.'

describe('Render the Header Component correctly', () => {
  test('should render the Title', async () => {
    customRender(<Header />)

    const title = await screen.findByText('The Ultimate Form')

    expect(title).toBeInTheDocument()
  })

  test('Shoud render NavLinks', async () => {
    customRender(<Header />)

    const personalInfo = await screen.findByText('Personal information')
    const contacts = await screen.findByText('Contacts')
    const education = await screen.findByText('Education')
    const password = await screen.findByText('Password')
    const files = await screen.findByText('Files')
    const video = await screen.findByText('Video')
    const result = await screen.findByText('Result')

    expect(personalInfo).toBeInTheDocument()
    expect(contacts).toBeInTheDocument()
    expect(education).toBeInTheDocument()
    expect(password).toBeInTheDocument()
    expect(files).toBeInTheDocument()
    expect(video).toBeInTheDocument()
    expect(result).toBeInTheDocument()
  })

  test('User can navigate acсording to link names', async () => {
    const { user } = customRender(
      <>
        <Header />
        <Routes>
          {router.map(({ index = false, path, component: Component }) => (
            <Route
              key={path}
              index={index}
              path={path}
              element={<Component />}
            />
          ))}
        </Routes>
      </>
    )

    await user.click(screen.getByRole('link', { name: 'Contacts' }))
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/contacts')
    })

    await user.click(screen.getByRole('link', { name: 'Education' }))
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/education')
    })

    await user.click(screen.getByRole('link', { name: 'Password' }))
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/password')
    })

    await user.click(screen.getByRole('link', { name: 'Files' }))
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/files')
    })

    await user.click(screen.getByRole('link', { name: 'Video' }))
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/video')
    })

    await user.click(screen.getByRole('link', { name: 'Result' }))
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/result')
    })

    await user.click(screen.getByRole('link', { name: 'Personal information' }))
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/')
    })
  })
})
