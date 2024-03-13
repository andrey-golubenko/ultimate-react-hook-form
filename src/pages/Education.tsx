import { forwardRef } from 'react'
import { Control, FieldValues, useFieldArray, useForm } from 'react-hook-form'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'
import CustomForm from '@/Components/FormComponents/CustomForm'
import DatePickerInput from '@/Components/FormComponents/DatePickerInput'
import TextInput from '@/Components/FormComponents/TextInput'
import NavButtons from '@/Components/NavButtons'
import { useData } from '@/HOC/DataContex'
import { EducationType } from '@/types'
import { schemaEducation } from '@/Yup/validatingSchemas'

const Education: React.ForwardRefExoticComponent<React.RefAttributes<unknown>> =
  forwardRef((_, ref) => {
    const { formData, setFormValue } = useData()
    const {
      register,
      handleSubmit,
      control,
      formState: { errors }
    } = useForm<EducationType>({
      mode: 'onBlur',
      defaultValues: formData?.education
        ? { education: formData?.education }
        : {
            education: [
              {
                id: 1,
                start: null,
                end: null,
                specialty: '',
                educational_institution: ''
              }
            ]
          },
      resolver: yupResolver(schemaEducation)
    })

    const { fields, append, remove } = useFieldArray({
      name: 'education',
      control
    })

    const onFormSubmit = (data: EducationType) => {
      const formatedEducation = data?.education?.map((item) => ({
        ...item,
        start: item?.start ? dayjs(item?.start) : null,
        end: item?.end ? dayjs(item?.end) : null
      }))

      setFormValue({
        ...data,
        education: formatedEducation,
        isDataReceived: true
      })
    }

    return (
      <>
        <Typography variant="h5" marginBottom="1.5rem">
          Enter your education
        </Typography>
        <CustomForm onSubmit={handleSubmit(onFormSubmit)}>
          {fields.map((field, index) => (
            <Paper
              key={field.id}
              variant="outlined"
              component="div"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '2rem',
                marginBottom: '1rem'
              }}
            >
              <Stack
                width="100%"
                flexDirection="row"
                justifyContent="space-between"
                marginBottom="1rem"
              >
                <DatePickerInput
                  name={`education.${index}.start`}
                  label="Date of start"
                  control={control as unknown as Control<FieldValues, unknown>}
                  views={['month', 'year']}
                  locale="de"
                  large
                />
                <DatePickerInput
                  name={`education.${index}.end`}
                  label="Date of graduation"
                  control={control as unknown as Control<FieldValues, unknown>}
                  views={['month', 'year']}
                  locale="de"
                  large
                />
              </Stack>

              <Stack alignItems="center" width="100%" marginBottom="1.5rem">
                <TextInput
                  {...register(`education.${index}.specialty` as const)}
                  id={`education.${index}.specialty`}
                  name={`education.${index}.specialty`}
                  label="Specialty"
                  type="text"
                  percentageWidth="80%"
                  error={!!errors?.education?.[index]?.specialty}
                  helperText={errors?.education?.[index]?.specialty?.message}
                />
                <TextInput
                  {...register(`education.${index}.educational_institution`)}
                  id={`education.${index}.educational_institution`}
                  name={`education.${index}.educational_institution`}
                  label="Educational institution"
                  type="text"
                  percentageWidth="80%"
                  error={!!errors?.education?.[index]?.educational_institution}
                  helperText={
                    errors?.education?.[index]?.educational_institution?.message
                  }
                />
              </Stack>
              {index > 0 && (
                <Button
                  sx={{ alignSelf: 'flex-end' }}
                  variant="contained"
                  type="button"
                  color="error"
                  onClick={() => remove(index)}
                >
                  DELETE
                </Button>
              )}
            </Paper>
          ))}

          <Stack margin="3rem 2rem 3rem 0">
            <Button
              variant="contained"
              type="button"
              color="info"
              sx={{ marginLeft: 'auto' }}
              onClick={() =>
                append({
                  id: fields.length + 1,
                  start: null,
                  end: null,
                  specialty: '',
                  educational_institution: ''
                })
              }
            >
              Add new education
            </Button>
          </Stack>
          <Divider variant="middle" />
          <NavButtons ref={ref} />
        </CustomForm>
      </>
    )
  })

export default Education
