import { PATHS } from './constants'

export const getNormalizedFieldName = (name: string) => {
  const [firstWord, ...restWords] = name.split(/(?=[A-Z])/)
  const normalizedFirstWord = firstWord
    ? firstWord.charAt(0).toUpperCase() + firstWord.slice(1)
    : ''
  const normalizedRestWords = restWords?.length
    ? restWords
        .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
        .join(' ')
    : ''

  return `${normalizedFirstWord} ${normalizedRestWords}`
}

export const getDirection = (location: string, direction: string) => {
  let url = ''

  const paths = Object.values(PATHS)
  const nextUrlIndex = paths.findIndex((path) => path === location)

  if (direction === 'next') {
    url = paths[nextUrlIndex + 1]
  }

  if (direction === 'previous') {
    url = paths[nextUrlIndex - 1]
  }

  return url
}
