import { screen, render, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Education from '../src/pages/Education'

const fillForm = async () => {
  const startEducation = screen.getByLabelText(/Date of start/)
  const endEducation = screen.getByLabelText(/Date of graduation/)
  const specialty = screen.getByLabelText(/Specialty/)
  const institution = screen.getByLabelText(/Educational institution/)

  await userEvent.click(startEducation)
  await userEvent.click(screen.getByText('Jan.'))
  await userEvent.click(screen.getByText('2021'))

  await userEvent.click(endEducation)
  await userEvent.click(screen.getByText('Fab.'))
  await userEvent.click(screen.getByText('2022'))

  await userEvent.type(specialty, 'Web-entwickler')
  await userEvent.type(institution, 'Oxford')

  return { startEducation, endEducation, specialty, institution }
}

describe('Education form', () => {
  test('Should render the Education form filled fields', () => {
    render(
      <BrowserRouter>
        <Education />
      </BrowserRouter>
    )

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
})
