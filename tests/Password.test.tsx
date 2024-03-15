import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Password from '../src/pages/Password'

const fillForm = async (): Promise<{
  [x: string]: HTMLElement
}> => {
  const password = screen.getByLabelText('Password')
  const confirmPassword = screen.getByLabelText('Password confirmation')

  await userEvent.type(password, 'Password123')
  await userEvent.type(confirmPassword, 'Password123')

  return { password, confirmPassword }
}

describe('Password form', () => {
  test('Should render the Password form filled fields', () => {
    render(
      <BrowserRouter>
        <Password />
      </BrowserRouter>
    )

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
})
