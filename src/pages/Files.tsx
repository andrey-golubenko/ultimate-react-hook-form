import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import CustomForm from '../components/FormComponents/CustomForm'
import FileInput from '../components/FormComponents/FileInput'
import PrimaryButton from '../components/PrimaryButton'
import { IFormFields, useData } from '../HOC/DataContex'
import { Paths } from '../constants'
import { schemaFiles } from '../Yup/validatingSchemas'

type FilesType = Pick<IFormFields, 'loadFiles'>

const Files = () => {
  const { formData, setFormValue } = useData()
  const {
    handleSubmit,
    setValue,
    register,
    watch,
    formState: { errors }
  } = useForm<FilesType>({
    defaultValues: { loadFiles: formData?.loadFiles },
    resolver: yupResolver(schemaFiles)
  })

  const [hasDuplicate, setHasDuplicate] = useState<string[] | []>([])

  const navigate = useNavigate()

  const onSubmit = (data: FilesType) => {
    setFormValue(data)
    navigate(Paths.video)
  }

  return (
    <>
      <Typography component="h5">Files</Typography>
      <CustomForm onSubmit={handleSubmit(onSubmit)}>
        <FileInput
          name="loadFiles"
          setValue={setValue}
          register={register}
          watch={watch}
          validatErrors={errors?.loadFiles}
          hasDuplicate={hasDuplicate}
          setHasDuplicate={setHasDuplicate}
        />
        <PrimaryButton>Next</PrimaryButton>
      </CustomForm>
    </>
  )
}

export default Files
