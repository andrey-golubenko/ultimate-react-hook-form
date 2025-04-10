import { forwardRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import parsePhoneNumberFromString from 'libphonenumber-js'
import CustomForm from '@/Components/FormComponents/CustomForm'
import TextInput from '@/Components/FormComponents/TextInput'
import NavButtons from '@/Components/NavButtons'
import { useData } from '@/HOC/DataContex'
import { schemaContacts } from '@/Yup/validatingSchemas'
import { ContactsType, SaveData } from '@/types'

const Contacts: React.ForwardRefExoticComponent<
  SaveData & React.RefAttributes<unknown>
> = forwardRef(({ saveData }, ref) => {
  const { formData, setFormValue } = useData()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control
  } = useForm<ContactsType>({
    defaultValues: {
      email: formData?.email,
      hasPhone: formData?.hasPhone,
      phoneNumber: formData?.phoneNumber
    },
    mode: 'onBlur',
    resolver: yupResolver(schemaContacts)
  })

  const hasPhone = watch('hasPhone')

  const onFormSubmit =
    saveData ||
    ((data: ContactsType) => {
      setFormValue({ ...data, isDataReceived: true })
    })

  const normalizePhoneNumber = (value: string) => {
    const phoneNumber = parsePhoneNumberFromString(value)
    if (!phoneNumber) {
      return value
    }

    return phoneNumber.formatInternational()
  }

  return (
    <>
      <Typography variant="h5">Enter your contacts</Typography>
      <CustomForm onSubmit={handleSubmit(onFormSubmit)}>
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
              ;(event.target as HTMLInputElement).value = normalizePhoneNumber(
                (event.target as HTMLInputElement).value
              )
            }}
            error={!!errors.phoneNumber}
            helperText={errors?.phoneNumber?.message}
          />
        )}
        <NavButtons ref={ref} />
      </CustomForm>
    </>
  )
})

export default Contacts
