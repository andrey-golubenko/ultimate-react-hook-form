import { forwardRef } from 'react'
import { FieldValues, UseFormRegister, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Typography from '@mui/material/Typography'
import CustomForm from '@/Components/FormComponents/CustomForm'
import VideoInput from '@/Components/FormComponents/VideoInput'
import NavButtons from '@/Components/NavButtons'
import { useData } from '../HOC/DataContex'
import { VideoType, videoSchema } from '../Yup/validatingSchemas'

const Video = forwardRef((_, ref) => {
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
        <NavButtons ref={ref} />
      </CustomForm>
    </>
  )
})

export default Video
