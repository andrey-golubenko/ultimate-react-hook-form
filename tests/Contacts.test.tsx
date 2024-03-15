import { screen, render, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Contacts from '../src/pages/Contacts'

const fillForm = async (): Promise<{
  [x: string]: HTMLElement
}> => {
  const email = screen.getByLabelText(/Email/)
  const checkBox = screen.getByLabelText(/Do you have a phone/)

  await userEvent.type(email, 'test@gmail.com')
  await userEvent.click(checkBox)

  const phoneNumber = await screen.getByLabelText(/PhoneNumber/)

  await userEvent.type(phoneNumber, '+12312312')

  return { email, checkBox, phoneNumber }
}

describe('Contact form', () => {
  test('Should render the Contact form filled fields', () => {
    render(
      <BrowserRouter>
        <Contacts />
      </BrowserRouter>
    )

    const fields = fillForm()

    waitFor(() =>
      expect(fields.then((email) => email)).toHaveValue('test@gmail.com')
    )

    waitFor(() =>
      expect(fields.then((checkBox) => checkBox)).toHaveFormValue(
        'checked',
        true
      )
    )

    waitFor(() =>
      expect(fields.then((phoneNumber) => phoneNumber)).toHaveValue('+12312312')
    )
  })
})
