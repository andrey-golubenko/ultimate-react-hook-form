import { forwardRef } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Typography from '@mui/material/Typography'
import CustomForm from '@/Components/FormComponents/CustomForm'
import PasswordInput from '@/Components/FormComponents/PasswordInput'
import NavButtons from '@/Components/NavButtons'
import { useData } from '@/HOC/DataContex'
import { shemaPassword } from '@/Yup/validatingSchemas'
import { PasswordType } from '@/types'

const Password: React.ForwardRefExoticComponent<React.RefAttributes<unknown>> =
  forwardRef((_, ref) => {
    const { formData, setFormValue } = useData()
    const {
      handleSubmit,
      register,
      formState: { errors }
    } = useForm<PasswordType>({
      defaultValues: {
        password: formData?.password,
        passwordConfirmation: formData.passwordConfirmation
      },
      mode: 'onBlur',
      resolver: yupResolver(shemaPassword)
    })

    const onFormSubmit = (data: PasswordType) => {
      setFormValue({ ...data, isDataReceived: true })
    }

    return (
      <>
        <Typography variant="h5">Enter your password</Typography>
        <CustomForm onSubmit={handleSubmit(onFormSubmit)}>
          <PasswordInput
            register={register}
            name="password"
            id="password"
            label="Password"
            error={!!errors?.password}
            helperText={errors?.password?.message}
            showValidation
          />
          <PasswordInput
            register={register}
            name="passwordConfirmation"
            id="passwordConfirmation"
            label="Password confirmation"
            error={!!errors?.passwordConfirmation}
            helperText={errors?.passwordConfirmation?.message}
          />
          <NavButtons ref={ref} />
        </CustomForm>
      </>
    )
  })

export default Password
