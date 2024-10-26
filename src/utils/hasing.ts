import bcrypt from 'bcrypt'

// encode
export const encode = (str: string): string => {
  return bcrypt.hashSync(str, 10)
}

// compare
export const comparePassword = (str: string, hash: string): boolean => {
  return bcrypt.compareSync(str, hash)
}
