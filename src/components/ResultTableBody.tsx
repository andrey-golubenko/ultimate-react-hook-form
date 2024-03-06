import { FC } from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import getVideoId from 'get-video-id'
import dayjs from 'dayjs'
import EmbeddedVideo from '@/Components/EmbeddedVideo'
import { getNormalizedFieldName } from '@/helpers'

interface IResultTableBody {
  field: [string, string]
}

const ResultTableBody: FC<IResultTableBody> = ({ field }) => {
  const [name, value] = field
  const videoID = name === 'video' ? getVideoId(value).id : ''
  const outputValue =
    name === 'birthDate' ? dayjs(value).format('DD.MM.YYYY') : value
  const fieldName = getNormalizedFieldName(name)
  const fieldValue = outputValue.toString()

  return (
    <TableRow sx={{ fontSize: '20px' }}>
      <TableCell>{fieldName}</TableCell>
      <TableCell align="right" sx={{ width: videoID ? '12.5rem' : 'inherit' }}>
        {videoID && (
          <EmbeddedVideo
            tabIndex={-1}
            src={`https://www.youtube.com/embed/${videoID}`}
            allowFullScreen
          />
        )}

        {Array.isArray(value) &&
          value?.map(
            ({ id, start, end, specialty, educational_institution }) => (
              <Stack key={id} alignItems="flex-end" mb={2}>
                <Typography fontSize="1.2rem">
                  {id}) {dayjs(start).format('MM.YYYY')} -{' '}
                  {dayjs(end).format('MM.YYYY')}
                </Typography>
                <Typography fontSize="1.2rem">{specialty}</Typography>
                <Typography fontSize="1.2rem">
                  {educational_institution}
                </Typography>
              </Stack>
            )
          )}

        {!videoID && !Array.isArray(value) && fieldValue}
      </TableCell>
    </TableRow>
  )
}

export default ResultTableBody
