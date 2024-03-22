import { screen } from '@testing-library/react'
import Result from '../src/pages/Result'
import customRender from './test-utils'

describe('Result page', () => {
  test('Should submit correct form data', async () => {
    const mockSave = jest.fn()

    const { user } = customRender(<Result saveData={mockSave} />)

    const formValue = screen.getByText('📋 Form Values')

    await user.click(screen.getByRole('button', { name: 'Submit' }))

    expect(formValue).toBeInTheDocument()
    expect(mockSave).toHaveBeenCalled()
  })
})
