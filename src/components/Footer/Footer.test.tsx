import { screen } from '@testing-library/react'
import customRender from '~/test-utils'
import Footer from '.'

describe('Render Footer companent corectly', () => {
  test('Should render the Title and current Year in the Footer', async () => {
    customRender(<Footer />)

    const title = await screen.findByText(/Copyright ©/)
    const year = await screen.findByText(new Date().getFullYear().toString(), {
      exact: false
    })

    expect(title).toBeInTheDocument()
    expect(year).toBeInTheDocument()
  })
})
