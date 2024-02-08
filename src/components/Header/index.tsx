import { useLocation } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { nanoid } from 'nanoid'
import { Stack } from '@mui/material'
import theme from '@/theme/theme'
import { PATHS } from '../../constants'

const Header = () => {
  const location = useLocation()

  return (
    <Stack component="header" sx={{ marginBottom: '3rem' }}>
      <Paper variant="outlined">
        <Typography
          component="h2"
          variant="h2"
          sx={{
            margin: theme.spacing(3, 0),
            textAlign: 'center',
            color: 'deeppink',
            textShadow: '1px 1px darkmagenta'
          }}
        >
          The Ultimate Form
        </Typography>
      </Paper>
      <Paper
        component="div"
        elevation={1}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '.7rem 0'
        }}
      >
        <Grid
          container
          sx={{
            justifyContent: 'space-around',
            width: '85%'
          }}
        >
          {PATHS &&
            Object.entries(PATHS)
              .filter((path) => path[0] !== 'notFound')
              .map((section) => {
                const pathName = section[0].split('_').join(' ')
                const sectionName =
                  pathName.charAt(0).toUpperCase() + pathName.slice(1)

                const active = section[1] === location.pathname

                return (
                  <Grid
                    key={nanoid()}
                    item
                    sx={{
                      color: active ? 'rgb(0,0,255,1)' : 'rgb(0,0,255,0.25)'
                    }}
                  >
                    <Typography variant="body1">{sectionName}</Typography>
                  </Grid>
                )
              })}
        </Grid>
      </Paper>
    </Stack>
  )
}

export default Header
