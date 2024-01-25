import { FC, FocusEvent, FormEvent, useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { bindFocus, usePopupState } from 'material-ui-popup-state/hooks'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import striptags from 'striptags'
import TextInput from './TextInput'
import InputPoper from '../InputPoper'
import { IFormFields, useData } from '../../HOC/DataContex'

interface IPasswordInput {
  register: UseFormRegister<FieldValues>
  name: string
  id: string
  label: string
  error?: boolean
  helperText?: string
  showValidation?: boolean
}

const PasswordInput: FC<IPasswordInput> = ({
  register,
  name,
  id,
  label,
  error,
  helperText,
  showValidation
}) => {
  const { formData, setFormValue } = useData()
  const [passwordValue, setPasswordValue] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const popupState = usePopupState({
    variant: 'popper',
    popupId: 'passwordValidation',
    disableAutoFocus: false
  })

  const { onBlur: bindFocusOnBlur, ...restBindFocus } = bindFocus(popupState)
  const { onBlur: registerOnBlur, ...restRegister } = register(name)

  const handleInput = (e: FormEvent<HTMLDivElement>) => {
    const clearedValue = striptags((e.target as HTMLInputElement).value)
    setPasswordValue(clearedValue)
  }

  const handleBlur = (e: FocusEvent<Element, Element>) => {
    const clearedValue = striptags((e.target as HTMLInputElement).value)

    setFormValue({ [name]: clearedValue })
    registerOnBlur(e)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    showValidation ? bindFocusOnBlur(e) : null
  }

  const passwordInputValue =
    passwordValue || (formData?.[name as keyof IFormFields] as string)

  return (
    <>
      <TextInput
        {...restRegister}
        {...(showValidation ? restBindFocus : null)}
        onBlur={handleBlur}
        onInput={(event) => handleInput(event)}
        name={name}
        id={id}
        type={showPassword ? 'text' : 'password'}
        label={label}
        error={error}
        helperText={helperText}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((previous) => !previous)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      {showValidation && (
        <InputPoper
          popupState={popupState}
          passwordValue={passwordInputValue}
        />
      )}
    </>
  )
}

export default PasswordInput
