import { prisma } from '.'
import { ServiceType } from '../types/service.type'

export const getServicesHanlder = async () => {
  return await prisma.service.findMany()
}

export const getServiceByIdHandler = async (id: string) => {
  return await prisma.service.findUnique({ where: { id } })
}

export const createServiceHandler = async (data: ServiceType) => {
  return await prisma.service.create({ data })
}

export const updateServiceHandler = async (id: string, data: ServiceType) => {
  return await prisma.service.update({ where: { id }, data })
}

export const deleteServiceHandler = async (id: string) => {
  return await prisma.service.delete({ where: { id } })
}

export const deleteAllServicesHandler = async () => {
  return await prisma.service.deleteMany()
}
