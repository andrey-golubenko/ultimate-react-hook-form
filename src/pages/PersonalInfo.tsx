import { forwardRef } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import dayjs from 'dayjs'
import CustomForm from '@/Components/FormComponents/CustomForm'
import SelectInput from '@/Components/FormComponents/SelectInput'
import TextInput from '@/Components/FormComponents/TextInput'
import PrimaryButton from '@/Components/PrimaryButton'
import DatePickerInput from '@/Components/FormComponents/DatePickerInput'
import { useData } from '@/HOC/DataContex'
import { schemaPersonalInfo } from '@/Yup/validatingSchemas'
import { IFormFields, PersonalInfoType } from '@/types'

const PersonalInfo: React.ForwardRefExoticComponent<
  React.RefAttributes<unknown>
> = forwardRef((_, ref) => {
  const { formData, setFormValue } = useData()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<PersonalInfoType>({
    defaultValues: {
      address: formData?.address || '',
      firstName: formData?.firstName,
      lastName: formData?.lastName,
      birthDate: formData?.birthDate || null
    },
    mode: 'onBlur',
    resolver: yupResolver(schemaPersonalInfo)
  })

  const onFormSubmit = (data: IFormFields) => {
    const { birthDate } = data
    setFormValue({
      ...data,
      birthDate: birthDate ? dayjs(birthDate) : null,
      isDataReceived: true
    })
  }

  return (
    <>
      <Typography variant="h5" marginBottom="1rem">
        Enter your personal information
      </Typography>
      <CustomForm onSubmit={handleSubmit(onFormSubmit)}>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <SelectInput name="address" label="Address" control={control} />
          <DatePickerInput
            name="birthDate"
            label="Date of birth"
            control={control}
            locale="de"
          />
        </Stack>
        <Stack>
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
        </Stack>
        <PrimaryButton buttonId="next" ref={ref}>
          Next {'>'}
        </PrimaryButton>
      </CustomForm>
    </>
  )
})

export default PersonalInfo
