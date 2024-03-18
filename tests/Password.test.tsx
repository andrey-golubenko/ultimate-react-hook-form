import { screen, waitFor } from '@testing-library/react'
import Password from '~/src/pages/Password'
import customRender from './test-utils'

describe('Password form', () => {
  test('Should render the Password form filled fields', () => {
    const { user } = customRender(<Password />)

    const fillForm = async (): Promise<{
      [x: string]: HTMLElement
    }> => {
      const password = screen.getByLabelText('Password')
      const confirmPassword = screen.getByLabelText('Password confirmation')

      await user.type(password, 'Password123')
      await user.type(confirmPassword, 'Password123')

      return { password, confirmPassword }
    }

    const fields = fillForm()

    waitFor(() => {
      expect(fields.then((password) => password)).toHaveValue('Password123')
    })

    waitFor(() => {
      expect(fields.then((confirmPassword) => confirmPassword)).toEqual(
        fields.then((password) => password)
      )
    })
  })

  test('Shold validate Password form fields', () => {
    const mockSave = jest.fn()

    const { user } = customRender(<Password saveData={mockSave} />)

    const fillForm = async (): Promise<void> => {
      const password = screen.getByLabelText('Password')
      const confirmPassword = screen.getByLabelText('Password confirmation')

      await user.type(password, 'password')
      await user.type(confirmPassword, 'Test')
      await user.click(screen.getByRole('button', { name: 'Next >' }))
    }

    fillForm()

    waitFor(() => {
      expect(screen.getAllByRole('alert')).toHaveLength(3)
      expect(mockSave).not.toBeCalled()
    })
  })
})
