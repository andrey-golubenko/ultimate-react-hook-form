import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import Typography from '@mui/material/Typography'
import CustomForm from '../components/FormComponents/CustomForm'
import { useData } from '../HOC/DataContex'
import { PasswordType, shemaPassword } from '../Yup/validatingSchemas'
import PasswordInput from '../components/FormComponents/PasswordInput'
import PrimaryButton from '../components/PrimaryButton'
import { PATHS } from '../constants'

const Password = () => {
  const { formData, setFormValue } = useData()
  const navigate = useNavigate()
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

  const onSubmit = (data: PasswordType) => {
    setFormValue(data)
    navigate(PATHS.files)
  }

  return (
    <>
      <Typography variant="h5">Enter your password</Typography>
      <CustomForm onSubmit={handleSubmit(onSubmit)}>
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
        <PrimaryButton>Next</PrimaryButton>
      </CustomForm>
    </>
  )
}

export default Password
