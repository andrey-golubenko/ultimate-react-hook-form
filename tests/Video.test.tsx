import { screen, waitFor } from '@testing-library/react'
import Video from '~/src/pages/Video'
import customRender from './test-utils'

describe('Video form', () => {
  test('Should render the Video form filled fields', () => {
    const { user } = customRender(<Video />)

    const fillForm = async (): Promise<{ [x: string]: HTMLElement }> => {
      const video = screen.getByLabelText('Video')

      await user.type(video, 'https://www.youtube.com/watch?v=JWhRMyyF7nc')

      return { video }
    }

    const field = fillForm()

    waitFor(() => {
      expect(field.then((video) => video)).toHaveValue(
        'https://www.youtube.com/watch?v=JWhRMyyF7nc'
      )
    })
  })

  test('Should validate Video form field', () => {
    const mockSave = jest.fn()

    const { user } = customRender(<Video saveData={mockSave} />)

    const fillForm = async (): Promise<void> => {
      const video = screen.getByLabelText('Video')

      await user.type(video, 'https://www.youtube.com/watch')
    }

    fillForm()

    waitFor(() => {
      expect(screen.getByRole('alert')).toHaveLength(1)
      expect(mockSave).not.toBeCalled()
    })
  })
})
