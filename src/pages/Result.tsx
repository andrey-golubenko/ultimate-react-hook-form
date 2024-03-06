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

const Result: FC = () => {
  const { formData } = useData()

  const fields = Object.entries(formData).filter(
    ([fieldName]) =>
      Boolean(fieldName) &&
      fieldName !== 'loadFiles' &&
      fieldName !== 'hasPhone' &&
      fieldName !== 'passwordConfirmation' &&
      fieldName !== 'isDataReceived'
  )

  const { loadFiles, education } = formData

  const handleSubmit = async () => {
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

    const res = await fetch('http://localhost:4000/', {
      method: 'POST',
      body: nativeFormData
    })

    if (res.status === 200) {
      Swal.fire('Great job!', 'success')
    }
  }

  return (
    <>
      <Typography variant="h5" component="h2" marginBottom={2.5}>
        📋 Form Values
      </Typography>
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
      <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
    </>
  )
}

export default Result
