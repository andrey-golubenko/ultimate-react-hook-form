import { FC } from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import getVideoId from 'get-video-id'
import ResponsiveEmbed from 'react-responsive-embed'

interface IResultTableBody {
  entry: [string, string]
}

const ResultTableBody: FC<IResultTableBody> = ({ entry }) => {
  const { id: videoID } = getVideoId(entry[1])

  return (
    <TableRow key={entry[0]} sx={{ fontSize: '20px' }}>
      <TableCell>{entry[0]}</TableCell>
      <TableCell align="right" sx={{ width: videoID ? '12.5rem' : 'inherit' }}>
        {!videoID ? (
          entry[1].toString()
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
