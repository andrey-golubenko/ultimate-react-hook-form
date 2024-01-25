import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Swal from 'sweetalert2'
import { useData } from '../HOC/DataContex'
import FilesList from '../components/FileList'
import PrimaryButton from '../components/PrimaryButton'
import { Paths } from '../constants'

const Result = () => {
  const { formData } = useData()

  const entries = Object.entries(formData).filter(
    (entry) => entry[0] !== 'loadFiles' && entry[0] !== 'hasPhone'
  )

  const { loadFiles } = formData

  const handleSubmit = async () => {
    const nativeFormData = new FormData()

    if (loadFiles) {
      loadFiles.forEach((file) =>
        nativeFormData.append('files', file, file.name)
      )
    }

    entries.forEach((entry) => nativeFormData.append(entry[0], entry[1]))

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
            <TableRow>
              <TableCell sx={{ fontSize: '28px' }}>Field</TableCell>
              <TableCell sx={{ fontSize: '28px' }} align="right">
                Value
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!entries.length &&
              entries.map((entry) => (
                <TableRow key={entry[0]} sx={{ fontSize: '20px' }}>
                  <TableCell>{entry[0]}</TableCell>
                  <TableCell align="right">{entry[1].toString()}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!!loadFiles?.length && (
        <>
          <Typography component="h2" variant="h5" marginBottom={2}>
            📦 Files
          </Typography>
          <FilesList files={loadFiles} />
        </>
      )}
      <Link
        to={Paths.root}
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
