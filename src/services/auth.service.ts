import { prisma } from '../services'
import UserType from '../types/user.type'

export const createUserHandler = async (data: UserType) => {
  return await prisma.user.create({ data })
}

export const getUsersHandler = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      avatar: true,
      name: true,
      email: true,
      role: true
    }
  })
}

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } })
}
