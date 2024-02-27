import * as yup from 'yup'
import YupPassword from 'yup-password'
import getVideoId from 'get-video-id'
import dayjs from 'dayjs'
import { MAX_FILE_SIZE, WRONG_FILE_SIZE_MESSAGE } from '@/constants'
import {
  PersonalInfoType,
  ContactsType,
  PasswordType,
  FilesType,
  VideoType,
  EducationType
} from '@/types'

YupPassword(yup)

const stringRegExp = /^([^0-9]*)$/
const phoneRegExp = /^([^a-zA-Z]*)$/

export const schemaPersonalInfo: yup.ObjectSchema<
  PersonalInfoType,
  yup.AnyObject,
  PersonalInfoType,
  ''
> = yup.object().shape({
  address: yup.string(),
  birthDate: yup.date().max(new Date(), "You can't be born in the future!"),
  firstName: yup
    .string()
    .matches(stringRegExp, 'First name shoud not contain numbers!')
    .required('First Name is a required field!'),
  lastName: yup
    .string()
    .matches(stringRegExp, 'Last name shoud not contain numbers!')
    .required('Last Name is a required field!')
})

export const schemaContacts: yup.ObjectSchema<
  ContactsType,
  yup.AnyObject,
  ContactsType,
  ''
> = yup.object().shape({
  email: yup
    .string()
    .email('Email should have correct format!')
    .required('Email is a required field!'),
  hasPhone: yup.boolean(),
  phoneNumber: yup.string().when('hasPhone', {
    is: true,
    then: () =>
      yup
        .string()
        .matches(phoneRegExp, {
          message: 'Phone number should contain only numbers',
          excludeEmptyString: false
        })
        .required("The field can't be empty!")
  })
})

// @ts-ignore
export const schemaEducation: yup.ObjectSchema<
  EducationType,
  yup.AnyObject,
  EducationType,
  ''
> = yup.object().shape({
  education: yup.array().of(
    yup.object().shape({
      start: yup.date(),
      end: yup
        .date()
        .min(
          yup.ref('start'),
          ({ min }) =>
            `Date needs to be before ${dayjs(min).format('MMMM YYYY')}!`
        ),
      specialty: yup.string(),
      educational_institution: yup.string()
    })
  )
})

export const shemaPassword: yup.ObjectSchema<
  PasswordType,
  yup.AnyObject,
  PasswordType,
  ''
> = yup.object().shape({
  password: yup
    .string()
    .min(5)
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .required('Password is a required field!'),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is a required field!')
    .oneOf([yup.ref('password')], 'Passwords must match!')
})

export const schemaFiles: yup.ObjectSchema<
  FilesType,
  yup.AnyObject,
  FilesType,
  ''
> = yup.object().shape({
  loadFiles: yup
    .mixed<File[]>()
    .required('Files is required field!')
    .test('loadFiles', WRONG_FILE_SIZE_MESSAGE, (value: File[]) =>
      value.every((file: File) => file?.size <= MAX_FILE_SIZE)
    )
})

export const videoSchema: yup.ObjectSchema<
  VideoType,
  yup.AnyObject,
  VideoType,
  ''
> = yup.object().shape({
  video: yup
    .string()
    .required('Video is required field!')
    .test(
      'validateVideoLink',
      'Video link is invalid',
      (value: string | null | undefined) => {
        const { id } = getVideoId(value as string)

        return !!id
      }
    )
})
