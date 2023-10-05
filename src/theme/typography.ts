import type { TypographyOptions } from '@mui/material/styles/createTypography'

export const fonts = {
  trirong: 'Trirong',
  mulish: 'Mulish'
}

type TypographyOptionsProps = TypographyOptions & 'inherit'

const typography: TypographyOptions = {
  fontFamily: fonts.mulish,
  h1: {
    fontFamily: fonts.trirong,
    fontSize: 30,
    lineHeight: '42px'
  },
  h2: {
    fontFamily: fonts.trirong,
    fontSize: 24,
    lineHeight: '36px'
  },
  h3: {
    fontFamily: fonts.trirong,
    fontSize: 20,
    lineHeight: '26px'
  },
  h4: {
    fontFamily: fonts.trirong,
    fontSize: 18,
    lineHeight: '20px'
  },
  body1: {
    fontSize: 16,
    lineHeight: '20px'
  },
  body2: {
    fontSize: 14,
    lineHeight: '18px'
  }
}

export default typography
