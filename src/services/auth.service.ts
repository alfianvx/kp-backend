import { prisma } from '../services'
import UserType from '../type/user.type'

export const createUserHandler = async (data: UserType) => {
  return await prisma.user.create({ data })
}

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } })
}
