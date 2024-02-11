import { forwardRef } from 'react'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomForm from '@/Components/FormComponents/CustomForm'
import TextInput from '@/Components/FormComponents/TextInput'
import PrimaryButton from '@/Components/PrimaryButton'
import { IFormFields, useData } from '../HOC/DataContex'
import { PersonalInfoType, schemaPersonalInfo } from '../Yup/validatingSchemas'

const PersonalInfo = forwardRef((_, ref) => {
  const { formData, setFormValue } = useData()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PersonalInfoType>({
    defaultValues: {
      firstName: formData?.firstName,
      lastName: formData?.lastName
    },
    mode: 'onBlur',
    resolver: yupResolver(schemaPersonalInfo)
  })

  const onSubmit = (data: IFormFields) => {
    setFormValue(data)
  }

  return (
    <>
      <Typography variant="h5">Enter your personal information</Typography>
      <CustomForm onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          {...register('firstName')}
          id="firstName"
          name="firstName"
          type="text"
          label="First Name"
          error={!!errors?.firstName}
          helperText={errors?.firstName?.message}
        />
        <TextInput
          {...register('lastName')}
          id="lastName"
          name="lastName"
          type="text"
          label="Last Name"
          error={!!errors?.lastName}
          helperText={errors?.lastName?.message}
        />
        <PrimaryButton buttonId="next" ref={ref}>
          Next {'>'}
        </PrimaryButton>
      </CustomForm>
    </>
  )
})

export default PersonalInfo
