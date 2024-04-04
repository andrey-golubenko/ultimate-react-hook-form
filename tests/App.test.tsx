import { screen, render } from '@testing-library/react'
import App from '@/App'

describe('Render the app correctly', () => {
  test('Should render the title', async () => {
    render(<App />)

    const header = await screen.findByText(/The Ultimate Form/)

    expect(header).toBeInTheDocument()
  })
})
