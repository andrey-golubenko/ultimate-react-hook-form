import { FC } from 'react'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Stack from '@mui/material/Stack'
import Swal from 'sweetalert2'
import FilesList from '@/Components/FileList'
import PrimaryButton from '@/Components/PrimaryButton'
import ResultTableBody from '@/Components/ResultTableBody'
import ResultTableHead from '@/Components/ResultTableHead'
import { useData } from '@/HOC/DataContex'
import { PATHS } from '@/constants'
import { SaveData } from '@/types'
import mockFields from '~/__mocks__/mockData'

const Result: FC<SaveData> = ({ saveData }) => {
  const { formData } = useData()

  const fields = saveData
    ? mockFields
    : Object.entries(formData).filter(
        ([fieldName, fieldValue]) =>
          Boolean(fieldValue) &&
          fieldName !== 'loadFiles' &&
          fieldName !== 'hasPhone' &&
          fieldName !== 'passwordConfirmation' &&
          fieldName !== 'isDataReceived'
      )

  const { loadFiles, education } = formData

  const handleSubmit =
    saveData ||
    (async () => {
      const nativeFormData = new FormData()

      if (loadFiles) {
        loadFiles.forEach((file) =>
          nativeFormData.append('files', file, file.name)
        )
      }

      if (education) {
        nativeFormData.append('education', JSON.stringify(education))
      }

      fields
        .filter(([fieldName]) => fieldName !== 'education')
        .forEach(([fieldName, fieldValue]) =>
          nativeFormData.append(fieldName, fieldValue)
        )

      if (nativeFormData.has('firstName') || nativeFormData.has('lastName')) {
        const res = await fetch('http://localhost:4000/', {
          method: 'POST',
          body: nativeFormData
        })

        if (res.status === 200) {
          Swal.fire('Great job!', 'success')
        }
      } else
        Swal.fire(
          'You entered incomplete data.',
          'Fill the form please!',
          'warning'
        )
    })

  return (
    <>
      <Typography variant="h5" component="h2" marginBottom={2.5}>
        📋 Form Values
      </Typography>
      {fields.length ? (
        <>
          <TableContainer component={Paper} sx={{ marginBottom: '3rem' }}>
            <Table>
              <TableHead>
                <ResultTableHead />
              </TableHead>
              <TableBody>
                {!!fields.length &&
                  fields.map(([name, value]) => (
                    <ResultTableBody key={name} field={[name, value]} />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {!!loadFiles?.length && (
            <Stack marginBottom={2}>
              <Typography component="h2" variant="h5" marginBottom={2.5}>
                📦 Files
              </Typography>
              <FilesList files={loadFiles} />
            </Stack>
          )}
        </>
      ) : (
        <Typography variant="h3" component="h2" marginBottom={12}>
          There is no data to display
        </Typography>
      )}
      <Link
        to={PATHS.personal_information}
        style={{
          color: '#ff1493',
          textShadow: '1px 1px darkmagenta',
          fontSize: '20px'
        }}
      >
        Start over !
      </Link>
      {!!fields.length && (
        <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
      )}
    </>
  )
}

export default Result
