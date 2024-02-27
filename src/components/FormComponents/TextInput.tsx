import { ForwardRefExoticComponent, forwardRef } from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'

type ITextInput = TextFieldProps & { percentageWidth?: string }

const TextInput: ForwardRefExoticComponent<ITextInput> = forwardRef(
  ({ percentageWidth, ...restProps }, ref) => (
    <TextField
      sx={{
        width: percentageWidth,
        '& .MuiInputBase-input.MuiOutlinedInput-input': {
          padding: '6px 8px'
        },
        '& .MuiFormLabel-root': {
          fontSize: '21px',
          lineHeight: 'normal',
          top: '-6px'
        }
      }}
      variant="outlined"
      margin="normal"
      fullWidth
      inputRef={ref}
      {...restProps}
    />
  )
)

export default TextInput
