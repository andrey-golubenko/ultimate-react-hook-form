import { screen } from '@testing-library/react'
import Files from '../src/pages/Files'
import customRender from './test-utils'

describe('Files form', () => {
  test('Should uploads file', async () => {
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' })

    const { user } = customRender(<Files />)

    const input = screen.getByTestId('loadFiles')

    await user.upload(input, file)

    expect((input as HTMLInputElement)?.files?.length).toBe(1)
    expect(screen.getByText('hello.txt')).toBeInTheDocument()
  })

  test('Should uploads multiple files', async () => {
    const files = [
      new File(['hello'], 'hello.txt', { type: 'text/plain' }),
      new File(['there'], 'there.png', { type: 'image/png' })
    ]

    const { user } = customRender(<Files />)

    const input = screen.getByTestId('loadFiles')

    await user.upload(input, files)

    expect((input as HTMLInputElement)?.files?.length).toBe(2)
    expect(screen.getByText('hello.txt')).toBeInTheDocument()
    expect(screen.getByText('there.png')).toBeInTheDocument()
  })

  test('Should validate Files form fields', async () => {
    const mockSave = jest.fn()
    const file = new File([new ArrayBuffer(1024 * 200)], 'there.png', {
      type: 'image/png'
    })

    const { user } = customRender(<Files saveData={mockSave} />)

    const input = screen.getByTestId('loadFiles')

    await user.upload(input, file)
    await user.click(screen.getByRole('button', { name: 'Next >' }))

    expect(document.querySelectorAll('p.Mui-error')).toHaveLength(1)
    expect(mockSave).not.toBeCalled()
  })
})
