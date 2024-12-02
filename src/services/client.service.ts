import { prisma } from '.'
import { ClientType } from '../type/client.type'

export const getClientsHanlder = async () => {
  return await prisma.client.findMany()
}

export const getClientByIdHandler = async (id: string) => {
  return await prisma.client.findUnique({ where: { id } })
}

export const createClientHandler = async (data: ClientType) => {
  return await prisma.client.create({ data })
}

export const updateClientHandler = async (id: string, data: ClientType) => {
  return await prisma.client.update({ where: { id }, data })
}

export const deleteClientHandler = async (id: string) => {
  return await prisma.client.delete({ where: { id } })
}

export const deleteAllCLientsHandler = async () => {
  return await prisma.client.deleteMany()
}
