import { screen } from '@testing-library/react'
import Education from '../src/pages/Education'
import customRender from './test-utils'

describe('Education form', () => {
  test('Should render the Education form filled fields', async () => {
    const { user } = customRender(<Education />)

    const startEducation = screen.getByLabelText(/Date of start/)
    const endEducation = screen.getByLabelText(/Date of graduation/)
    const specialty = screen.getByLabelText(/Specialty/)
    const institution = screen.getByLabelText(/Educational institution/)

    await user.click(startEducation)
    await user.type(startEducation, 'Februar 2020')

    await user.click(endEducation)
    await user.type(endEducation, 'September 2024')

    await user.type(specialty, 'Web-entwickler')
    await user.type(institution, 'Oxford')

    expect(startEducation).toHaveValue('Februar 2020')

    expect(endEducation).toHaveValue('September 2024')

    expect(specialty).toHaveValue('Web-entwickler')

    expect(institution).toHaveValue('Oxford')
  })

  test('Should validate Education form fields', async () => {
    const mockSave = jest.fn()

    const { user } = customRender(<Education saveData={mockSave} />)

    const startEducation = screen.getByLabelText(/Date of start/)
    const endEducation = screen.getByLabelText(/Date of graduation/)

    await user.click(startEducation)
    await user.type(startEducation, 'M 2024')

    await user.click(endEducation)
    await user.type(endEducation, 'F 2020')

    await user.click(screen.getByRole('button', { name: 'Next >' }))

    expect(document.querySelectorAll('p.Mui-error')).toHaveLength(2)
    expect(mockSave).not.toBeCalled()
  })
})
