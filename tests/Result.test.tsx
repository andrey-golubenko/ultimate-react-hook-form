import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import { Route, Routes } from 'react-router-dom'
import Header from '~/src/components/Header'
import router from '~/src/router'
import customRender from './test-utils'

describe('Result page', () => {
  test('Should submit correct form data', async () => {
    const mockSave = jest.fn()

    const { user } = customRender(
      <>
        <Header />
        <Routes>
          {router.map(({ index = false, path, component: Component }) => (
            <Route
              key={path}
              index={index}
              path={path}
              element={<Component saveData={mockSave} />}
            />
          ))}
        </Routes>
      </>
    )

    const address = screen.getByLabelText(/Address/)
    await user.click(address)
    const optionsAddress = await screen.findByRole('listbox', {
      name: /Address/
    })
    await user.click(within(optionsAddress).getByText(/Mister/))

    const birthDate = screen.getByLabelText(/Date of birth/)
    fireEvent.change(birthDate, { target: { value: '2020/01/01' } })

    const firstName = screen.getByLabelText(/First Name/)
    await user.type(firstName, 'John')

    const lastName = screen.getByLabelText(/Last Name/)
    await user.type(lastName, 'Smith')

    await user.click(screen.getByRole('link', { name: 'Contacts' }))

    const email = screen.getByLabelText(/Email/)
    await user.type(email, 'test@gmail.com')

    const checkBox = screen.getByLabelText(/Do you have a phone/)
    await user.click(checkBox)

    const phoneNumber = screen.getByLabelText(/PhoneNumber/)
    await user.type(phoneNumber, '+12345678')

    await user.click(screen.getByRole('link', { name: 'Result' }))

    await user.click(screen.getByRole('button', { name: 'Submit' }))

    waitFor(() => {
      expect(mockSave).toHaveBeenCalledWith({
        address: 'Mister',
        birthDate: '01.01.2020',
        firstName: 'John',
        lastName: 'Smith',
        email: 'test@gmail.com',
        phoneNumber: '+12345678'
      })
    })
  })
})
