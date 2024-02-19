import { FC } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'
import 'dayjs/locale/de'
import { Control, Controller } from 'react-hook-form'
import { PersonalInfoType } from '@/Yup/validatingSchemas'

interface IDatePickerInput {
  locale: string
  name: 'birthDate'
  label: string
  control: Control<Pick<PersonalInfoType, 'birthDate'>, unknown>
}

const DatePickerInput: FC<IDatePickerInput> = ({
  name,
  label,
  locale,
  control
}) => (
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, value, ...restField } }) => (
        <DatePicker
          label={label}
          value={value}
          inputRef={ref}
          sx={{
            maxWidth: '12rem',
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
