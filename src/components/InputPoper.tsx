import { FC } from 'react'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material'
import { PopupState, bindPopper } from 'material-ui-popup-state/hooks'
import Yup from '@/Yup/yupMethods'
import CheckIcon from '@/Components/CheckIcon'

interface IInputPopper {
  popupState: PopupState
  passwordValue: string
}

const InputPoper: FC<IInputPopper> = ({ popupState, passwordValue }) => {
  const PopperRow = styled(Typography)(() => ({
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.14rem',
    fontWeight: 400,
    paddingLeft: '.5rem',
    marginBottom: 0.8
  }))

  return (
    <Popper
      {...bindPopper(popupState)}
      transition
      placement="left-start"
      popperOptions={{
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [5, 10]
            }
          }
        ]
      }}
      sx={{ zIndex: '15' }}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={400}>
          <Paper elevation={2} sx={{ padding: 2.5 }}>
            <Typography
              component="p"
              sx={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: 1.5 }}
            >
              Your password must have:
            </Typography>
            <PopperRow>
              <CheckIcon
                valid={
                  !!passwordValue &&
                  Yup.string().min(5).isValidSync(passwordValue)
                }
              />
              5 or more characters
            </PopperRow>
            <PopperRow>
              <CheckIcon
                valid={
                  !!passwordValue &&
                  Yup.string()
                    .minLowercase(1)
                    .minUppercase(1)
                    .isValidSync(passwordValue)
                }
              />
              At least one upper and lowercase letters
            </PopperRow>
            <PopperRow>
              <CheckIcon
                valid={
                  !!passwordValue &&
                  Yup.string().minNumbers(1).isValidSync(passwordValue)
                }
              />
              At least one number
            </PopperRow>
          </Paper>
        </Fade>
      )}
    </Popper>
  )
}

export default InputPoper
