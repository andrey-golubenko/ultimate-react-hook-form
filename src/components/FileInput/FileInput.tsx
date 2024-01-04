// @ts-nocheck
import { CloudUpload, InsertDriveFile } from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import { FC, useCallback, useEffect } from 'react'
import { DropzoneOptions, useDropzone } from 'react-dropzone'
import FilesList from '@/Components/FilesList'

interface IFileInput {
  name: string
  setValue: UseFormSetValue<TFieldValues>
  register: UseFormRegister<TFieldValues>
  watch: UseFormWatch<TFieldValues>
}

const FileInput: FC<IFileInput> = ({ setValue, register, watch, name }) => {
  const files: File[] = watch(name)

  // eslint-disable-next-line @typescript-eslint/ban-types
  const onDrop = useCallback<Pick<DropzoneOptions, 'onDrop'> & Function>(
    (droppedFiles: File[]) => {
      const newFiles = (!!files?.length && [...files].concat(droppedFiles)) || droppedFiles
      setValue(name, newFiles, { shouldValidate: true })
    },
    [setValue, name, files]
  )

  const handleDelete = useCallback(
    (elementName: string) => {
      const newFiles = files.filter((file) => file.name !== elementName)
      setValue(name, newFiles, { shouldValidate: true })
    },
    [setValue, name, files]
  )

  const { onBlur } = register(name)

  useEffect(() => {
    register(name)
  }, [register, name])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <>
      <Paper
        variant="outlined"
        {...getRootProps()}
        sx={{
          backgroundColor: '#eee',
          textAlign: 'center',
          cursor: 'pointer',
          color: '#333',
          padding: '10px',
          marginTop: '20px'
        }}
      >
        <CloudUpload
          sx={{
            marginTop: '16px',
            color: '#888',
            fontSize: '42px'
          }}
        />
        <input multiple name={name} onBlur={onBlur} id={name} {...getInputProps()} />
        <p>Drag and drop files here, or click to select files</p>
      </Paper>
      {!!files?.length && <FilesList files={files} handleDelete={handleDelete} />}
    </>
  )
}

export default FileInput
