import { screen } from '@testing-library/react'
import Video from '~/src/pages/Video'
import customRender from './test-utils'

describe('Video form', () => {
  test('Should render the Video form filled fields', async () => {
    const { user } = customRender(<Video />)

    const video = screen.getByLabelText('Video')

    await user.type(video, 'https://www.youtube.com/watch?v=JWhRMyyF7nc')

    expect(video).toHaveValue('https://www.youtube.com/watch?v=JWhRMyyF7nc')
  })

  test('Should validate Video form field', async () => {
    const mockSave = jest.fn()

    const { user } = customRender(<Video saveData={mockSave} />)

    const video = screen.getByLabelText('Video')

    await user.type(video, 'https://www.youtube.com/watch')

    await user.click(screen.getByRole('button', { name: 'Next >' }))

    expect(document.querySelectorAll('p.Mui-error')).toHaveLength(1)
    expect(mockSave).not.toBeCalled()
  })
})
