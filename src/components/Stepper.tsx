import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import { PATHS } from '@/constants'
import { IStepChange } from '@/types'

const Stepper: FC<IStepChange> = ({ onStepChange }) => (
  <Grid
    container
    sx={{
      justifyContent: 'space-around',
      width: '85%',
      flexWrap: 'wrap'
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
            <Grid
              key={url}
              item
              sx={{ ':not(:last-child)': { marginRight: '1rem' } }}
            >
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
