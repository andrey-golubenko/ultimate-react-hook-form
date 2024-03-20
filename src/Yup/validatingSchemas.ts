import getVideoId from 'get-video-id'
import dayjs from 'dayjs'
import Yup from '@/Yup/yupMethods'
import { MAX_FILE_SIZE, WRONG_FILE_SIZE_MESSAGE } from '@/constants'
import {
  PersonalInfoType,
  ContactsType,
  PasswordType,
  FilesType,
  VideoType,
  EducationType
} from '@/types'

const stringRegExp = /^([^0-9]*)$/
const phoneRegExp = /^([^a-zA-Z]*)$/

export const schemaPersonalInfo: Yup.ObjectSchema<
  PersonalInfoType,
  Yup.AnyObject,
  PersonalInfoType,
  ''
> = Yup.object().shape({
  address: Yup.string(),
  birthDate: Yup.date()
    .max(new Date(), "You can't be born in the future!")
    .nullable(),
  firstName: Yup.string()
    .matches(stringRegExp, 'The first name should not contain numbers!')
    .required('First Name is a required field!'),
  lastName: Yup.string()
    .matches(stringRegExp, 'The last name should not contain numbers!')
    .required('Last Name is a required field!')
})

export const schemaContacts: Yup.ObjectSchema<
  ContactsType,
  Yup.AnyObject,
  ContactsType,
  ''
> = Yup.object().shape({
  email: Yup.string()
    .email('Email should have correct format!')
    .required('Email is a required field!'),
  hasPhone: Yup.boolean(),
  phoneNumber: Yup.string().when('hasPhone', {
    is: true,
    then: () =>
      Yup.string()
        .matches(phoneRegExp, {
          message: 'Phone number should contain only numbers',
          excludeEmptyString: false
        })
        .required("The field can't be empty!")
  })
})

// @ts-ignore
export const schemaEducation: Yup.ObjectSchema<
  EducationType,
  Yup.AnyObject,
  EducationType,
  ''
> = Yup.object().shape({
  education: Yup.array().of(
    Yup.object().shape({
      start: Yup.string().when('end', {
        is: false || null,
        then: (schema) => schema.nullable(),
        otherwise: (schema) =>
          schema.required(
            'The graduation date cannot exist without the start date of the education.'
          )
      }),

      end: Yup.string()
        .nullable()
        .min(
          Yup.ref('start'),
          ({ min }) =>
            `Date needs to be before ${dayjs(min).format('MMMM YYYY')}!`
        ),
      specialty: Yup.string().when('start', {
        is: false || null,
        then: (schema) => schema.nullable(),
        otherwise: (schema) =>
          schema.required('The Specialty is a required field!')
      }),
      educational_institution: Yup.string().nullable()
    })
  )
})

export const shemaPassword: Yup.ObjectSchema<
  PasswordType,
  Yup.AnyObject,
  PasswordType,
  ''
> = Yup.object().shape({
  password: Yup.string()
    .min(5)
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .required('Password is a required field!'),
  passwordConfirmation: Yup.string()
    .required('Password confirmation is a required field!')
    .oneOf([Yup.ref('password')], 'Passwords must match!')
})

export const schemaFiles: Yup.ObjectSchema<
  FilesType,
  Yup.AnyObject,
  FilesType,
  ''
> = Yup.object().shape({
  loadFiles: Yup.mixed<File[]>()
    .required('Files is required field!')
    .test('loadFiles', WRONG_FILE_SIZE_MESSAGE, (value: File[]) =>
      value.every((file: File) => file?.size <= MAX_FILE_SIZE)
    )
})

export const schemaVideo: Yup.ObjectSchema<
  VideoType,
  Yup.AnyObject,
  VideoType,
  ''
> = Yup.object().shape({
  video: Yup.string()
    .required('Video is required field!')
    .test(
      'validateVideoLink',
      'Video link is invalid!',
      (value: string | null | undefined) => {
        const { id } = getVideoId(value as string)

        return !!id
      }
    )
})
