import { screen, render } from '@testing-library/react'
import Footer from '.'

describe('Render Footer companent corectly', () => {
  test('should render the Title and current Year', async () => {
    render(<Footer />)

    const title = await screen.findByText(/Copyright ©/)
    const year = await screen.findByText(new Date().getFullYear().toString(), {
      exact: false
    })

    expect(title).toBeInTheDocument()
    expect(year).toBeInTheDocument()
  })
})
