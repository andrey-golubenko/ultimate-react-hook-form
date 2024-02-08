import { FieldValues, UseFormRegister, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import Typography from '@mui/material/Typography'
import CustomForm from '@/Components/FormComponents/CustomForm'
import VideoInput from '@/Components/FormComponents/VideoInput'
import PrimaryButton from '@/Components/PrimaryButton'
import { PATHS } from '../constants'
import { useData } from '../HOC/DataContex'
import { VideoType, videoSchema } from '../Yup/validatingSchemas'

const Video = () => {
  const navigate = useNavigate()
  const { formData, setFormValue } = useData()
  const { video } = formData
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: { video },
    resolver: yupResolver(videoSchema)
  })

  const onSubmit = (data: VideoType) => {
    setFormValue(data)
    navigate(PATHS.result)
  }

  return (
    <>
      <Typography variant="h5">Enter your video link</Typography>
      <CustomForm onSubmit={handleSubmit(onSubmit)}>
        <VideoInput
          register={register as unknown as UseFormRegister<FieldValues>}
          id="video"
          name="video"
          label="Video"
          validatErrors={errors?.video}
          watch={watch}
        />
        <PrimaryButton>Next</PrimaryButton>
      </CustomForm>
    </>
  )
}

export default Video
