import { FC, useCallback, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { CloudUpload, Archive } from '@mui/icons-material'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'
import {
  FieldError,
  FieldValues,
  Merge,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form'
import FilesList from '@/Components/FileList'
import { MAX_FILE_SIZE } from '@/constants'

interface IFileInput {
  name: string
  setValue: UseFormSetValue<FieldValues>
  register: UseFormRegister<FieldValues>
  watch: UseFormWatch<FieldValues>
  validatErrors: Merge<FieldError, (FieldError | undefined)[]> | undefined
  hasDuplicate: [] | string[]
  setHasDuplicate: React.Dispatch<React.SetStateAction<string[] | []>>
}

type OnDropType =
  | (<T extends File>(
      acceptedFiles: T[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => void)
  | undefined

const FileInput: FC<IFileInput> = ({
  name,
  setValue,
  register,
  watch,
  validatErrors,
  hasDuplicate,
  setHasDuplicate
}) => {
  useEffect(() => {
    register(name)
  }, [register, name])

  const files: File[] = watch(name)

  // eslint-disable-next-line @typescript-eslint/ban-types
  const onDrop = useCallback<OnDropType & Function>(
    (droppedFiles: File[]) => {
      const filesNames = files?.map((file) => file.name)

      const duplicatedFiles = droppedFiles
        .filter((file) => filesNames?.includes(file?.name))
        .map((file) => file?.name)

      const uniqueFiles = droppedFiles.filter(
        (file) => !filesNames?.includes(file?.name)
      )

      setHasDuplicate(() => [...duplicatedFiles])

      if (uniqueFiles.length) {
        const newFiles =
          (!!files?.length && [...files].concat(uniqueFiles)) || uniqueFiles
        setValue(name, newFiles)
      }
    },
    [files, setValue, name, setHasDuplicate]
  )

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleDelete = useCallback(
    (fileName: string) => {
      const newFiles = files.filter((file) => file?.name !== fileName)
      setValue(name, newFiles, { shouldValidate: true })
    },
    [setValue, name, files]
  )

  const { onBlur, onChange } = register(name)

  const wordEnd = hasDuplicate && hasDuplicate.length > 0 ? 's' : ''

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
          margin: '2.5rem 0'
        }}
      >
        <CloudUpload
          sx={{
            marginTop: '16px',
            color: '#888',
            fontSize: '42px'
          }}
        />
        <input
          name={name}
          id={name}
          multiple
          accept="image/*,.pdf,.csv,.xlsx"
          // accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          {...getInputProps({ onBlur, onChange })}
        />
        <p>
          Drag and drop files here, or click to select files. The file size
          should be no more than {(MAX_FILE_SIZE / 1024)?.toFixed() || 0} Mb.
        </p>
      </Paper>
      {validatErrors && (
        <Typography variant="body2" sx={{ color: 'red', mb: '1rem' }}>
          {validatErrors?.message}
        </Typography>
      )}
      {!!hasDuplicate?.length && (
        <>
          <Typography
            variant="body2"
            sx={{ color: 'red', fontSize: '1.25rem' }}
          >
            {`You tried to upload file${wordEnd} with duplicated name${wordEnd}:`}
          </Typography>

          <List>
            {hasDuplicate.map((fileName: string) => (
              <ListItem key={fileName}>
                <ListItemIcon>
                  <Archive fontSize="small" sx={{ color: 'red' }} />
                </ListItemIcon>
                <ListItemText
                  secondary={fileName}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '& .MuiListItemText-secondary': {
                      fontSize: '1.2rem',
                      color: '#d32f2f'
                    }
                  }}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
      {!!files?.length && (
        <FilesList files={files} handleDelete={handleDelete} />
      )}
    </>
  )
}

export default FileInput
