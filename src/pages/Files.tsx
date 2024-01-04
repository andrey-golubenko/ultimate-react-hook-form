import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import CustomForm from '../HOC/CustomForm'
import FileInput from '../components/FileInput/FileInput'
import PrimaryButton from '../components/PrimaryButton'
import { IFormFields, useData } from '../HOC/DataContex'
import paths from '../constants'

const Files = () => {
  const { formData, setFormValue } = useData()
  const { handleSubmit, setValue, register, watch } = useForm<Pick<IFormFields, 'loadFiles'>>({
    defaultValues: { loadFiles: formData?.loadFiles }
  })
  const navigate = useNavigate()

  const onSubmit = (data: Pick<IFormFields, 'loadFiles'>) => {
    setFormValue(data)
    navigate(paths.result)
  }

  return (
    <>
      <Typography component="h5">Files</Typography>
      <CustomForm onSubmit={handleSubmit(onSubmit)}>
        <FileInput name="loadFiles" setValue={setValue} register={register} watch={watch} />
        <PrimaryButton>Next</PrimaryButton>
      </CustomForm>
    </>
  )
}

export default Files
