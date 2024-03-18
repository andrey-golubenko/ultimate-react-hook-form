import { screen, waitFor } from '@testing-library/react'
import Education from '~/src/pages/Education'
import customRender from './test-utils'

describe('Education form', () => {
  test('Should render the Education form filled fields', () => {
    const { user } = customRender(<Education />)

    const fillForm = async (): Promise<{
      [x: string]: HTMLElement
    }> => {
      const startEducation = screen.getByLabelText(/Date of start/)
      const endEducation = screen.getByLabelText(/Date of graduation/)
      const specialty = screen.getByLabelText(/Specialty/)
      const institution = screen.getByLabelText(/Educational institution/)

      await user.click(startEducation)
      await user.click(screen.getByText('Jan.'))
      await user.click(screen.getByText('2021'))

      await user.click(endEducation)
      await user.click(screen.getByText('Fab.'))
      await user.click(screen.getByText('2022'))

      await user.type(specialty, 'Web-entwickler')
      await user.type(institution, 'Oxford')

      return { startEducation, endEducation, specialty, institution }
    }

    const filds = fillForm()

    waitFor(() => {
      expect(filds.then((startEducation) => startEducation)).toHaveValue(
        `${new Date('01-01-2021').getMonth().toString()}.${new Date(
          '01-01-2021'
        )
          .getFullYear()
          .toString()}`
      )
    })

    waitFor(() => {
      expect(filds.then((endEducation) => endEducation)).toHaveValue(
        `${new Date('01-02-2022').getMonth().toString()}.${new Date(
          '01-02-2022'
        )
          .getFullYear()
          .toString()}`
      )
    })

    waitFor(() => {
      expect(filds.then((specialty) => specialty)).toHaveValue('Web-entwickler')
    })

    waitFor(() => {
      expect(filds.then((specialty) => specialty)).toHaveValue('Oxford')
    })
  })

  test('Should validate Education form fields', () => {
    const mockSave = jest.fn()

    const { user } = customRender(<Education saveData={mockSave} />)

    const fillForm = async (): Promise<void> => {
      const startEducation = screen.getByLabelText(/Date of start/)
      const endEducation = screen.getByLabelText(/Date of graduation/)

      await user.click(startEducation)
      await user.click(screen.getByText('Jan.'))
      await user.click(screen.getByText('2023'))

      await user.click(endEducation)
      await user.click(screen.getByText('Fab.'))
      await user.click(screen.getByText('2022'))

      await user.click(screen.getByRole('button', { name: 'Next >' }))
    }

    fillForm()

    waitFor(() => {
      expect(screen.getByRole('alert')).toHaveLength(2)
      expect(mockSave).not.toBeCalled()
    })
  })
})
