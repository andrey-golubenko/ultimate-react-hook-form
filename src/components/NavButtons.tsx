import Stack from '@mui/material/Stack'
import { forwardRef } from 'react'
import PrimaryButton from './PrimaryButton'

const NavButtons = forwardRef((_, ref) => (
  <Stack flexDirection="row" justifyContent="space-around">
    <PrimaryButton buttonId="previous" ref={ref}>
      {'< '} Previous
    </PrimaryButton>
    <PrimaryButton buttonId="next" ref={ref}>
      Next {'>'}
    </PrimaryButton>
  </Stack>
))

export default NavButtons
