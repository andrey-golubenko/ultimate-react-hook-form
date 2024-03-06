import { FC, useEffect, useState } from 'react'
import {
  FieldError,
  FieldValues,
  Merge,
  UseFormRegister,
  UseFormWatch
} from 'react-hook-form'
import getVideoId from 'get-video-id'
import Stack from '@mui/material/Stack'
import EmbeddedVideo from '@/Components/EmbeddedVideo'
import TextInput from '@/Components/FormComponents/TextInput'

interface IVideoInput {
  name: string
  label: string
  id: string
  register: UseFormRegister<FieldValues>
  watch: UseFormWatch<FieldValues>
  validatErrors: Merge<FieldError, (FieldError | undefined)[]> | undefined
}

const VideoInput: FC<IVideoInput> = ({
  name,
  label,
  id: inputID,
  register,
  watch,
  validatErrors
}) => {
  const input = watch(name)

  const [customVideoID, setCustomVideoID] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState<string>(input)

  useEffect(() => {
    if (inputValue) {
      const { id } = getVideoId(inputValue)
      setCustomVideoID(id)
    }
  }, [inputValue])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(() => event.target.value)

  return (
    <Stack>
      <TextInput
        {...register(name)}
        name={name}
        label={label}
        id={inputID}
        error={!!validatErrors}
        helperText={validatErrors?.message}
        onChange={handleChange}
      />
      <EmbeddedVideo
        tabIndex={-1}
        src={`https://www.youtube.com/embed/${customVideoID}`}
        allowFullScreen
      />
    </Stack>
  )
}

export default VideoInput
