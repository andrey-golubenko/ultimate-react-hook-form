import TextField, { TextFieldProps } from '@mui/material/TextField'
import { ForwardRefExoticComponent, forwardRef } from 'react'

const TextInput: ForwardRefExoticComponent<TextFieldProps> = forwardRef((props, ref) => (
  <TextField
    sx={{
      '& .MuiInputBase-root .MuiInputBase-input': { padding: '8px' },
      '& .MuiFormLabel-root': { fontSize: '21px', lineHeight: 'normal' }
    }}
    variant="outlined"
    margin="normal"
    fullWidth
    {...props}
    inputRef={ref}
  />
))

export default TextInput
