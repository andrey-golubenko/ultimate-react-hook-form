import { forwardRef } from 'react'
import { FieldValues, UseFormRegister, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Typography from '@mui/material/Typography'
import CustomForm from '@/Components/FormComponents/CustomForm'
import VideoInput from '@/Components/FormComponents/VideoInput'
import NavButtons from '@/Components/NavButtons'
import { useData } from '@/HOC/DataContex'
import { schemaVideo } from '@/Yup/validatingSchemas'
import { SaveData, VideoType } from '@/types'

const Video: React.ForwardRefExoticComponent<
  SaveData & React.RefAttributes<unknown>
> = forwardRef(({ saveData }, ref) => {
  const { formData, setFormValue } = useData()
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: { video: formData?.video },
    resolver: yupResolver(schemaVideo)
  })

  const onFormSubmit =
    saveData ||
    ((data: VideoType) => {
      setFormValue({ ...data, isDataReceived: true })
    })

  return (
    <>
      <Typography variant="h5">Enter your video link</Typography>
      <CustomForm onSubmit={handleSubmit(onFormSubmit)}>
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
