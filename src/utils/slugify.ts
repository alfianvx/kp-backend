// function to convert a string to a slug
export const slugify = (str: string): string => {
  const randomChars = Math.random().toString(36).substring(2, 7)

  return (
    str
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '') +
    '-' +
    randomChars.toLocaleLowerCase()
  )
}
