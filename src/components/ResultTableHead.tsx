import { FC } from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

const ResultTableHead: FC = () => (
  <TableRow>
    <TableCell sx={{ fontSize: '1.7rem' }}>Field</TableCell>
    <TableCell sx={{ fontSize: '1.7rem' }} align="right">
      Value
    </TableCell>
  </TableRow>
)

export default ResultTableHead
