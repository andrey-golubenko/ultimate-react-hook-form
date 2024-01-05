import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import parsePhoneNumberFromString from 'libphonenumber-js'
import CustomForm from '../HOC/CustomForm'
import TextInput from '../components/TextInput'
import { TContacts, schemaCotacts } from '../validatingSchemas'
import PrimaryButton from '../components/PrimaryButton'
import { useData } from '../HOC/DataContex'
import paths from '../constants'

const Cotacts = () => {
  const { formData, setFormValue } = useData()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control
  } = useForm<TContacts>({
    defaultValues: { email: formData?.email, hasPhone: formData?.hasPhone, phoneNumber: formData?.phoneNumber },
    mode: 'onBlur',
    resolver: yupResolver(schemaCotacts)
  })

  const hasPhone = watch('hasPhone')

  const navigate = useNavigate()

  const onSubmit = (data: TContacts) => {
    setFormValue(data)
    navigate(paths.files)
  }

  const normalizePhoneNumber = (value: string) => {
    const phoneNumber = parsePhoneNumberFromString(value)
    if (!phoneNumber) {
      return value
    }

    return phoneNumber.formatInternational()
  }

  return (
    <>
      <Typography variant="h5">Cotacts</Typography>
      <CustomForm onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          {...register('email')}
          id="email"
          name="email"
          type="email"
          label="Email"
          required
          error={!!errors?.email}
          helperText={errors?.email?.message}
        />

        <Controller
          name="hasPhone"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  id="hasPhone"
                  onChange={(e) => field.onChange(e.target.checked)}
                  checked={field.value}
                  color="primary"
                />
              }
              label="Do you have a phone?"
            />
          )}
        />

        {hasPhone && (
          <TextInput
            {...register('phoneNumber')}
            id="phoneNumber"
            name="phoneNumber"
            label="PhoneNumber"
            type="tel"
            onInput={(event) => {
              // eslint-disable-next-line no-param-reassign, prettier/prettier
              (event.target as HTMLInputElement).value = normalizePhoneNumber(
                (event.target as HTMLInputElement).value
              )
            }}
            error={!!errors.phoneNumber}
            helperText={errors?.phoneNumber?.message}
          />
        )}
        <PrimaryButton>Next</PrimaryButton>
      </CustomForm>
    </>
  )
}

export default Cotacts
