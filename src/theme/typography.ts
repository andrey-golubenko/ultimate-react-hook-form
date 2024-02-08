import type { TypographyOptions } from '@mui/material/styles/createTypography'

export const fonts = {
  trirong: 'Trirong',
  mulish: 'Mulish'
}

// type TypographyOptionsProps = TypographyOptions & 'inherit'

const typography: TypographyOptions = {
  fontFamily: fonts.mulish,
  h1: {
    fontFamily: fonts.trirong,
    fontSize: 36,
    lineHeight: '42px'
  },
  h2: {
    fontFamily: fonts.trirong,
    fontSize: 30,
    lineHeight: '36px'
  },
  h3: {
    fontFamily: fonts.trirong,
    fontSize: 26,
    lineHeight: '26px'
  },
  h4: {
    fontFamily: fonts.trirong,
    fontSize: 24,
    lineHeight: '20px'
  },
  body1: {
    fontSize: 22,
    lineHeight: '20px'
  },
  body2: {
    fontSize: 20,
    lineHeight: '18px'
  }
}

export default typography
