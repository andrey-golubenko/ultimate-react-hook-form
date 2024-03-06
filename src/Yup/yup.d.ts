import {
  StringSchema as StringSchemaYup,
  ArraySchema as ArraySchemaYup
} from 'yup'

declare module 'yup' {
  export interface StringSchema extends StringSchemaYup {
    passwordConfirmation(message?: string): StringSchemaYup
    phoneNumber(message?: string): StringSchemaYup
    validateDate(message?: string, format?: string): StringSchemaYup
    validateYoutubeLink(message?: string): StringSchemaYup
    minLowercase(length: number, message?: string): StringSchemaYup
    minUppercase(length: number, message?: string): StringSchemaYup
    minNumbers(length: number, message?: string): StringSchemaYup
  }
  export interface ArraySchema extends ArraySchemaYup {
    validateRules(message?: string): ArraySchemaYup<unknown>
  }
}
