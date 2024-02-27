import { FC } from 'react'
import {
  DatePicker,
  DateView,
  LocalizationProvider
} from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'
import 'dayjs/locale/de'
import { Control, Controller, FieldValues } from 'react-hook-form'

interface IDatePickerInput {
  locale: string
  name: string
  label: string
  control: Control<FieldValues, unknown>
  large?: boolean
  views?: DateView[]
}

const DatePickerInput: FC<IDatePickerInput> = ({
  name,
  label,
  locale,
  control,
  views,
  large
}) => (
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
    <Controller
      name={name}
      control={control}
      render={({
        field: { ref, value, ...restField },
        fieldState: { error }
      }) => (
        <DatePicker
          label={label}
          value={value}
          inputRef={ref}
          views={views}
          slotProps={{
            textField: {
              variant: 'outlined',
              error: !!error,
              helperText: error?.message
            }
          }}
          sx={{
            maxWidth: !large ? '12rem' : '14rem',
            '& .MuiInputBase-input': {
              padding: '.4rem .75rem',
              fontSize: '21px'
            },
            '.MuiFormControl-root': {
              maxWidth: '80%'
            },
            '.MuiInputLabel-root.MuiFormLabel-root': { top: '-9px' }
          }}
          {...restField}
        />
      )}
    />
  </LocalizationProvider>
)

export default DatePickerInput
