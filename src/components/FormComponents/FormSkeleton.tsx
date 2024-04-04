import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import { styled } from '@mui/material'

const FormSkeleton = () => {
  const SkeletonSmall = styled(Skeleton)(() => ({
    width: '10rem',
    height: '2.7rem',
    borderRadius: '.3rem',
    margin: '1rem 0 .5rem'
  }))

  const SkeletonNormal = styled(Skeleton)(() => ({
    width: '100%',
    height: '2.7rem',
    borderRadius: '.3rem',
    margin: '1rem 0 .5rem'
  }))

  return (
    <>
      <SkeletonNormal
        variant="text"
        animation="wave"
        height="1.3rem"
        sx={{ marginBottom: '1rem' }}
      />
      <Stack flexDirection="row" justifyContent="space-between" width="100%">
        <SkeletonSmall variant="rectangular" animation="wave" />
        <SkeletonSmall variant="rectangular" animation="wave" />
      </Stack>
      <SkeletonNormal variant="rectangular" animation="wave" />
      <SkeletonNormal variant="rectangular" animation="wave" />
    </>
  )
}

export default FormSkeleton
