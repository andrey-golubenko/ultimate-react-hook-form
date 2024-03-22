import { screen } from '@testing-library/react'
import Contacts from '../src/pages/Contacts'
import customRender from './test-utils'

describe('Contact form', () => {
  test('Should render the Contact form filled fields', async () => {
    const { user } = customRender(<Contacts />)

    const email = screen.getByLabelText(/Email/)
    const checkBox = screen.getByLabelText(/Do you have a phone/)

    await user.type(email, 'test@gmail.com')
    await user.click(checkBox)

    const phoneNumber = screen.getByLabelText(/PhoneNumber/)
    await user.type(phoneNumber, '+12312312')

    expect(email).toHaveValue('test@gmail.com')

    expect(checkBox).toBeChecked()

    expect(phoneNumber).toHaveValue('+1 2312312')
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

    expect(document.querySelectorAll('p.Mui-error')).toHaveLength(2)
    expect(mockSave).not.toBeCalled()
  })
})
