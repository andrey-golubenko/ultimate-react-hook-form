import { FC } from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import getVideoId from 'get-video-id'
import ResponsiveEmbed from 'react-responsive-embed'
import { getNormalizedFieldName } from '../helpers'

interface IResultTableBody {
  field: [string, string]
}

const ResultTableBody: FC<IResultTableBody> = ({ field }) => {
  const [name, value] = field
  const videoID = name === 'video' ? getVideoId(value).id : ''
  const outputValue =
    name === 'birthDate' ? new Date(value).toLocaleDateString() : value
  const fieldName = getNormalizedFieldName(name)
  const fieldValue = outputValue.toString()

  return (
    <TableRow sx={{ fontSize: '20px' }}>
      <TableCell>{fieldName}</TableCell>
      <TableCell align="right" sx={{ width: videoID ? '12.5rem' : 'inherit' }}>
        {!videoID ? (
          fieldValue
        ) : (
          <ResponsiveEmbed
            tabIndex={-1}
            src={`https://www.youtube.com/embed/${videoID}`}
            allowFullScreen
          />
        )}
      </TableCell>
    </TableRow>
  )
}

export default ResultTableBody
