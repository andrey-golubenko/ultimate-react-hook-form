import { screen, within, waitFor, fireEvent } from '@testing-library/react'
import PersonalInfo from '~/src/pages/PersonalInfo'
import customRender from './test-utils'

describe('Personal information form', () => {
  test('Should render the Personal information form filled fields', () => {
    const { user } = customRender(<PersonalInfo />)

    const fillForm = async (): Promise<{
      [x: string]: HTMLElement
    }> => {
      const address = screen.getByLabelText(/Address/)
      const birthDate = screen.getByLabelText(/Date of birth/)
      const firstName = screen.getByLabelText(/First Name/)
      const lastName = screen.getByLabelText(/Last Name/)

      await user.click(address)
      const optionsAddress = await screen.findByRole('listbox', {
        name: /Address/
      })
      await user.click(within(optionsAddress).getByText(/Mister/))

      await user.click(birthDate)
      await user.click(screen.getByText('1'))

      await user.type(firstName, 'John')
      await user.type(lastName, 'Smith')

      return { address, birthDate, firstName, lastName }
    }

    const fields = fillForm()

    waitFor(() =>
      expect(fields.then((address) => address)).toHaveValue('Mister')
    )

    waitFor(() =>
      expect(fields.then((birthDate) => birthDate)).toHaveValue(
        `01.${new Date().getMonth().toString()}.${new Date()
          .getFullYear()
          .toString()}`
      )
    )
    waitFor(() =>
      expect(fields.then((firstName) => firstName)).toHaveValue('John')
    )

    waitFor(() =>
      expect(fields.then((lastName) => lastName)).toHaveValue('Smith')
    )
  })

  test('Should validate Personal information form fields', async () => {
    const mockSave = jest.fn()

    const { user } = customRender(<PersonalInfo saveData={mockSave} />)

    const address = screen.getByLabelText(/Address/)
    const birthDate = screen.getByLabelText(/Date of birth/)
    const firstName = screen.getByLabelText(/First Name/)
    const lastName = screen.getByLabelText(/Last Name/)

    await user.click(address)
    const optionsAddress = await screen.findByRole('listbox', {
      name: /Address/
    })
    await user.click(within(optionsAddress).getByText(/Mister/))

    fireEvent.change(birthDate, { target: { value: '2030/01/01' } })

    await user.type(firstName, '12345')
    await user.type(lastName, '12345')

    await user.click(screen.getByRole('button', { name: 'Next >' }))

    waitFor(() => {
      expect(screen.getAllByRole('alert')).toHaveLength(3)
      expect(mockSave).not.toBeCalled()
    })
  })
})
