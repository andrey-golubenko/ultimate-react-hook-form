import { FC } from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import getVideoId from 'get-video-id'
import ResponsiveEmbed from 'react-responsive-embed'
import getNormalizedFieldName from '../helpers'

interface IResultTableBody {
  entry: [string, string]
}

const ResultTableBody: FC<IResultTableBody> = ({ entry }) => {
  const { id: videoID } = getVideoId(entry[1])
  const fieldName = getNormalizedFieldName(entry[0])
  const fieldValue = entry[1].toString()

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
