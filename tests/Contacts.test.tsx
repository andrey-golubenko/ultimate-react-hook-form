import { screen, waitFor } from '@testing-library/react'
import Contacts from '~/src/pages/Contacts'
import customRender from './test-utils'

describe('Contact form', () => {
  test('Should render the Contact form filled fields', () => {
    const { user } = customRender(<Contacts />)

    const fillForm = async (): Promise<{
      [x: string]: HTMLElement
    }> => {
      const email = screen.getByLabelText(/Email/)
      const checkBox = screen.getByLabelText(/Do you have a phone/)

      await user.type(email, 'test@gmail.com')
      await user.click(checkBox)

      const phoneNumber = screen.getByLabelText(/PhoneNumber/)
      await user.type(phoneNumber, '+12312312')

      return { email, checkBox, phoneNumber }
    }

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

    waitFor(() =>
      expect(fields.then((phoneNumber) => phoneNumber)).toHaveValue('+12312312')
    )
  })

  test('Should validate Contacts form fields', async () => {
    const mockSave = jest.fn()
    const { user } = customRender(<Contacts saveData={mockSave} />)

    const email = screen.getByLabelText(/Email/)
    const checkBox = screen.getByLabelText(/Do you have a phone/)

    await user.type(email, 'test')
    await user.click(checkBox)

    const phoneNumber = screen.getByLabelText(/PhoneNumber/)
    await user.type(phoneNumber, 'test')

    await user.click(screen.getByRole('button', { name: 'Next >' }))

    waitFor(() => {
      expect(screen.getAllByRole('alert')).toHaveLength(2)
      expect(mockSave).not.toBeCalled()
    })
  })
})
