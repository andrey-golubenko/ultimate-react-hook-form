import { screen, within } from '@testing-library/react'
import PersonalInfo from '~/src/pages/PersonalInfo'
import customRender from './test-utils'

describe('Personal information form', () => {
  test('Should render the Personal information form filled fields', async () => {
    const { user } = customRender(<PersonalInfo />)

    const address = screen.getByLabelText(/Address/)
    const birthDate = screen.getByLabelText(/Date of birth/)
    const firstName = screen.getByLabelText(/First Name/)
    const lastName = screen.getByLabelText(/Last Name/)

    await user.click(address)
    const optionsAddress = await screen.findByRole('listbox')
    await user.click(within(optionsAddress).getByText(/Mister/))

    await user.type(birthDate, '01.01.2010')

    await user.type(firstName, 'John')
    await user.type(lastName, 'Smith')

    expect(screen.getByText(/Mister/)).toBeInTheDocument()
    expect(birthDate).toHaveValue('01.01.2010')
    expect(firstName).toHaveValue('John')
    expect(lastName).toHaveValue('Smith')
  })

  test('Should validate Personal information form fields', async () => {
    const mockSave = jest.fn()

    const { user } = customRender(<PersonalInfo saveData={mockSave} />)

    const address = screen.getByLabelText(/Address/)
    const birthDate = screen.getByLabelText(/Date of birth/)
    const firstName = screen.getByLabelText(/First Name/)
    const lastName = screen.getByLabelText(/Last Name/)

    await user.click(address)
    const optionsAddress = await screen.findByRole('listbox')
    await user.click(within(optionsAddress).getByText(/Mister/))

    await user.type(birthDate, '01.01.2030')

    await user.type(firstName, '12345')
    await user.type(lastName, 'Smith12345')

    await user.click(screen.getByRole('button', { name: 'Next >' }))

    expect(document.querySelectorAll('p.Mui-error')).toHaveLength(3)
    expect(mockSave).not.toBeCalled()
  })
})
