import { FC } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Control, Controller, FieldValues } from 'react-hook-form'

interface ISelectInput {
  name: string
  label: string
  control: Control<FieldValues, unknown>
}

const SelectInput: FC<ISelectInput> = ({ name, label, control }) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormControl
        sx={{
          m: '.5rem .5rem .5rem 0',
          minWidth: 120,
          fontSize: '21px',
          lineHeight: 'normal'
        }}
        size="small"
      >
        <InputLabel id={name} sx={{ top: '-4px' }}>
          {label}
        </InputLabel>
        <Select
          {...field}
          labelId={name}
          label={label}
          sx={{ '.MuiSelect-select': { padding: '6px 14px' } }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Mister">Mister</MenuItem>
          <MenuItem value="Missis">Missis</MenuItem>
          <MenuItem value="Miss">Miss</MenuItem>
        </Select>
      </FormControl>
    )}
  />
)

export default SelectInput
