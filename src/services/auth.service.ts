import { prisma } from '../services'
import UserType from '../types/user.type'

export const createUserHandler = async (data: UserType) => {
  return await prisma.user.create({ data })
}

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } })
}
export const getUsersHandler = async () => {
  return await prisma.user.findMany()
}

export const getUserByIdHandler = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id }
  })
}

export const updateUserHandler = async (id: string, data: UserType) => {
  return await prisma.user.update({ where: { id }, data })
}
