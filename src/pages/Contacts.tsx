import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import parsePhoneNumberFromString from 'libphonenumber-js'
import { forwardRef } from 'react'
import CustomForm from '@/Components/FormComponents/CustomForm'
import TextInput from '@/Components/FormComponents/TextInput'
import { ContactsType, schemaContacts } from '../Yup/validatingSchemas'
import { useData } from '../HOC/DataContex'
import NavButtons from '../components/NavButtons'

const Contacts: React.ForwardRefExoticComponent<React.RefAttributes<unknown>> =
  forwardRef((_, ref) => {
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

    const onSubmit = (data: ContactsType) => {
      setFormValue(data)
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
        <Typography variant="h5">Enter your contacts</Typography>
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
              (event.target as HTMLInputElement).value = normalizePhoneNumber((event.target as HTMLInputElement).value)
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
