const getNormalizedFieldName = (name: string) => {
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

export default getNormalizedFieldName
