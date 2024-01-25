import { FC, useCallback, useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
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
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { flushSync } from 'react-dom'
import { nanoid } from 'nanoid'
import { MAX_FILE_SIZE, WRONG_FILE_SIZE_MESSAGE } from '@/constants'
import FilesList from '../FileList'

interface IFileInput {
  name: string
  setValue: UseFormSetValue<FieldValues>
  register: UseFormRegister<FieldValues>
  watch: UseFormWatch<FieldValues>
  validatErrors: Merge<FieldError, (FieldError | undefined)[]> | undefined
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
  validatErrors
}) => {
  const [hadDuplicate, setHadDuplicate] = useState<string[] | []>([])
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

      if (uniqueFiles.length) {
        const newFiles =
          (!!files?.length && [...files].concat(uniqueFiles)) || uniqueFiles
        setValue(name, newFiles)
      }

      flushSync(() => {
        setHadDuplicate(() => [...duplicatedFiles])
      })
    },
    [files, setValue, name, setHadDuplicate]
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

  const isWrongFileSize: boolean =
    validatErrors?.message === WRONG_FILE_SIZE_MESSAGE

  const wordEnd = hadDuplicate && hadDuplicate.length > 1 ? 's' : ''

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
      {!!hadDuplicate?.length && (
        <>
          <Typography
            variant="body2"
            sx={{ color: 'red', fontSize: '1.25rem' }}
          >
            {`You tried to upload file${wordEnd} with duplicated name${wordEnd}:`}
          </Typography>

          <List>
            {hadDuplicate.map((fileName: string) => (
              <ListItem key={nanoid()}>
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
        <FilesList
          files={files}
          sizeError={isWrongFileSize}
          handleDelete={handleDelete}
        />
      )}
    </>
  )
}

export default FileInput
