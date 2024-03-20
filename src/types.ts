import { Dayjs } from 'dayjs'

export type CustomDate = Dayjs | Date | null

export interface IFormFields {
  isDataReceived?: boolean // service field - never displayed

  address?: string
  birthDate?: CustomDate
  firstName?: string
  lastName?: string
  email?: string
  hasPhone?: boolean
  phoneNumber?: string
  education?: {
    id: number
    start?: CustomDate
    end?: CustomDate
    specialty?: string
    educational_institution?: string
  }[]
  password?: string
  passwordConfirmation?: string
  loadFiles?: File[]
  video?: string | null
}

export type PersonalInfoType = Pick<
  IFormFields,
  'firstName' | 'lastName' | 'address' | 'birthDate'
>

export type ContactsType = Pick<
  IFormFields,
  'email' | 'hasPhone' | 'phoneNumber'
>

export type EducationType = Pick<IFormFields, 'education'>

export type PasswordType = Pick<
  IFormFields,
  'password' | 'passwordConfirmation'
>

export type FilesType = Pick<IFormFields, 'loadFiles'>

export type VideoType = Pick<IFormFields, 'video'>

export type ResponsiveEmbededProps = {
  ratio?: string
} & JSX.IntrinsicElements['iframe']

export type SaveData = { saveData?: () => void }

export interface IStepChange {
  onStepChange?: (event?: React.FormEvent<Element> | undefined) => void
}
