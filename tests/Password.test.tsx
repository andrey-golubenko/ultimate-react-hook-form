import { screen } from '@testing-library/react'
import Password from '../src/pages/Password'
import customRender from './test-utils'

describe('Password form', () => {
  test('Should render the Password form filled fields', async () => {
    const { user } = customRender(<Password />)

    const password = screen.getByLabelText('Password')
    const confirmPassword = screen.getByLabelText('Password confirmation')

    await user.type(password, 'Password123')
    await user.type(confirmPassword, 'Password123')

    expect(password).toHaveValue('Password123')
    expect(confirmPassword).toHaveValue('Password123')
  })

  test('Shold validate Password form fields', async () => {
    const mockSave = jest.fn()

    const { user } = customRender(<Password saveData={mockSave} />)

    const password = screen.getByLabelText('Password')
    const confirmPassword = screen.getByLabelText('Password confirmation')

    await user.type(password, 'password')
    await user.type(confirmPassword, 'Test')
    await user.click(screen.getByRole('button', { name: 'Next >' }))

    expect(document.querySelectorAll('p.Mui-error')).toHaveLength(2)
    expect(mockSave).not.toBeCalled()
  })
})
