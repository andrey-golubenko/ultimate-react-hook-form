/* eslint-disable @typescript-eslint/default-param-last */
// @ts-nocheck
import { addMethod, string } from 'yup'
import * as Yup from 'yup'
// pluralize
const p = (word, num) => (num === 1 ? word : `${word}s`)

const isNullOrUndefined = function (value) {
  return value === null || value === undefined || value === ''
}

const fieldName = (location: string): string =>
  location.slice().charAt(1).toUpperCase() + location.slice(2)

addMethod(
  string,
  'minLowercase',
  function minLowercase(length: number = 1, message: string) {
    const msg =
      message ||
      `${fieldName(
        window.location.pathname
      )} must contain at least ${length} lowercase ${p('letter', length)}`
    return this.test({
      name: 'minLowercase',
      exclusive: true,
      message: msg,
      params: { length },
      test(value) {
        return (
          isNullOrUndefined(value) ||
          (value.match(/[a-z]/g) || []).length >= length
        )
      }
    })
  }
) // minLowercase()

addMethod(string, 'minUppercase', function (length = 1, message) {
  const msg =
    message ||
    `${fieldName(
      window.location.pathname
    )} must contain at least ${length} uppercase ${p('letter', length)}`
  return this.test({
    name: 'minUppercase',
    exclusive: true,
    message: msg,
    params: { length },
    test(value) {
      return (
        isNullOrUndefined(value) ||
        (value.match(/[A-Z]/g) || []).length >= length
      )
    }
  })
}) // minUppercase()

addMethod(string, 'minNumbers', function (length = 1, message) {
  const msg =
    message ||
    `${fieldName(window.location.pathname)} must contain at least ${length} ${p(
      'number',
      length
    )}`
  return this.test({
    name: 'minNumber',
    exclusive: true,
    message: msg,
    params: { length },
    test(value) {
      return (
        isNullOrUndefined(value) ||
        (value.match(/[0-9]/g) || []).length >= length
      )
    }
  })
}) // minNumber()

addMethod(string, 'minSymbols', function (length = 1, message) {
  const msg =
    message ||
    `${fieldName(window.location.pathname)} must contain at least ${length} ${p(
      'symbol',
      length
    )}`
  return this.test({
    name: 'minSymbol',
    exclusive: true,
    message: msg,
    params: { length },
    test(value) {
      return (
        isNullOrUndefined(value) ||
        (value.match(/[^a-zA-Z0-9\s]/g) || []).length >= length
      )
    }
  })
}) // minSymbol()

addMethod(string, 'minRepeating', function (length = 2, message) {
  const msg =
    message ||
    `${fieldName(
      window.location.pathname
    )} must not contain sequences of more than ${length} repeated ${p(
      'character',
      length
    )}`
  return this.test({
    name: 'minRepeating',
    exclusive: true,
    message: msg,
    params: { length },
    test(value) {
      return (
        isNullOrUndefined(value) ||
        !new RegExp(`(.)\\1{${length},}`).test(value)
      )
    }
  })
}) // minRepeating()

addMethod(string, 'minWords', function (length = 2, message) {
  const msg =
    message ||
    `${fieldName(window.location.pathname)} must contain at least ${length} ${p(
      'word',
      length
    )}`
  const rx = /[a-zA-Z0-9]/
  return this.test({
    name: 'minWords',
    exclusive: true,
    message: msg,
    params: { length },
    test(value) {
      return (
        isNullOrUndefined(value) ||
        value.split(' ').filter((v) => !!v && rx.test(v)).length >= length
      )
    }
  })
}) // minWords()

export default Yup
