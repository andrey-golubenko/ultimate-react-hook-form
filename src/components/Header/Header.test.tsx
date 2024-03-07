import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import router from '@/router'
import Header from '.'

describe('Render the Header Component correctly', () => {
  test('should render the Title', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )

    const title = await screen.findByText('The Ultimate Form')

    expect(title).toBeInTheDocument()
  })

  test('Shoud render NavLinks', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )

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
    render(
      <BrowserRouter>
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
      </BrowserRouter>
    )

    userEvent.click(screen.getByRole('link', { name: 'Contacts' }))
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/contacts')
    })

    userEvent.click(screen.getByRole('link', { name: 'Education' }))
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/contacts')
    })

    userEvent.click(screen.getByRole('link', { name: 'Password' }))
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/password')
    })

    userEvent.click(screen.getByRole('link', { name: 'Files' }))
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/files')
    })

    userEvent.click(screen.getByRole('link', { name: 'Video' }))
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/video')
    })

    userEvent.click(screen.getByRole('link', { name: 'Result' }))
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/result')
    })

    userEvent.click(screen.getByRole('link', { name: 'Personal information' }))
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/')
    })
  })
})
