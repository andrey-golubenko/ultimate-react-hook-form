import { screen, render, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Files from '../src/pages/Files'

describe('Files form', () => {
  test('Should uploads file', async () => {
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' })

    render(
      <BrowserRouter>
        <Files />
      </BrowserRouter>
    )

    const input = screen.getByTestId('loadFiles')
    await waitFor(() => userEvent.upload(input, file))

    expect((input as HTMLInputElement)?.files?.length).toBe(1)
    expect(screen.getByText('hello.txt')).toBeInTheDocument()
  })

  test('Should uploads multiple files', async () => {
    const files = [
      new File(['hello'], 'hello.txt', { type: 'text/plain' }),
      new File(['there'], 'there.png', { type: 'image/png' })
    ]

    render(
      <BrowserRouter>
        <Files />
      </BrowserRouter>
    )

    const input = screen.getByTestId('loadFiles')
    await waitFor(() => userEvent.upload(input, files))

    expect((input as HTMLInputElement)?.files?.length).toBe(2)
    expect(screen.getByText('hello.txt')).toBeInTheDocument()
    expect(screen.getByText('there.png')).toBeInTheDocument()
  })
})
