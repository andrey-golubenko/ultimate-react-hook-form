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
  const { id: videoID } = getVideoId(field[1])
  const fieldName = getNormalizedFieldName(field[0])
  const fieldValue = field[1].toString()

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
