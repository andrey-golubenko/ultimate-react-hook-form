import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import { nanoid } from 'nanoid'
import { PATHS } from '@/constants'

const Stepper: FC<{ onStepChange: () => void }> = ({ onStepChange }) => (
  <Grid
    container
    sx={{
      justifyContent: 'space-around',
      width: '85%'
    }}
  >
    {PATHS &&
      Object.entries(PATHS)
        .filter(([name]) => name !== 'notFound')
        .map(([name, url]) => {
          const pathName = name.split('_').join(' ')
          const sectionName =
            pathName.charAt(0).toUpperCase() + pathName.slice(1)

          return (
            <Grid key={nanoid()} item>
              <NavLink
                end
                to={url}
                onClick={onStepChange}
                style={({ isActive }) => ({
                  color: isActive ? 'rgb(100,10,255,1)' : 'rgb(100,10,255,0.5)'
                })}
              >
                {sectionName}
              </NavLink>
            </Grid>
          )
        })}
  </Grid>
)

export default Stepper
