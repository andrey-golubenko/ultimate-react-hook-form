import { screen, render, within, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import PersonalInfo from '../src/pages/PersonalInfo'

const fillForm = async (): Promise<{
  [x: string]: HTMLElement
}> => {
  const address = screen.getByLabelText(/Address/)
  const birthDate = screen.getByLabelText(/Date of birth/)
  const firstName = screen.getByLabelText(/First Name/)
  const lastName = screen.getByLabelText(/Last Name/)

  await userEvent.click(address)
  const optionsAddress = await screen.findByRole('listbox', {
    name: /Address/
  })
  await userEvent.click(within(optionsAddress).getByText(/Mister/))

  await userEvent.click(birthDate)
  await userEvent.click(screen.getByText('1'))

  await userEvent.type(firstName, 'John')
  await userEvent.type(lastName, 'Smith')

  return { address, birthDate, firstName, lastName }
}

describe('Personal information form', () => {
  test('Should render the Personal information form filled fields', () => {
    render(
      <BrowserRouter>
        <PersonalInfo />
      </BrowserRouter>
    )

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
})
