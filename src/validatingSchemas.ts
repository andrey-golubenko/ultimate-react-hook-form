import * as yup from 'yup'
import { IFormFields } from './HOC/DataContex'
// eslint-disable-next-line import/no-cycle
import { TContacts } from './pages/Cotacts'

const stringRegExp = /^([^0-9]*)$/
const phoneRegExp = /^([^a-zA-Z]*)$/

export const schemaPersonalInfo: yup.ObjectSchema<
  Pick<IFormFields, 'firstName' | 'lastName'>,
  yup.AnyObject,
  Pick<IFormFields, 'firstName' | 'lastName'>,
  ''
> = yup.object().shape({
  firstName: yup
    .string()
    .matches(stringRegExp, 'First name shoud not contain numbers!')
    .required('First Name is a required field!'),
  lastName: yup
    .string()
    .matches(stringRegExp, 'Last name shoud not contain numbers!')
    .required('Last Name is a required field!')
})

export const schemaCotacts: yup.ObjectSchema<TContacts, yup.AnyObject, TContacts, ''> = yup.object().shape({
  email: yup.string().email('Email should have correct format!').required('Email is a required field!'),
  hasPhone: yup.boolean(),
  phoneNumber: yup.string().when('hasPhone', {
    is: true,
    then: () =>
      yup
        .string()
        .matches(phoneRegExp, { message: 'Phone number should contain only numbers', excludeEmptyString: false })
        .required("The field can't be empty!")
  })
})
