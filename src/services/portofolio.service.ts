import { prisma } from '.'
import { PortofolioType } from '../types/portofolio.type'

export const getPortofoliosHanlder = async () => {
  return await prisma.portofolio.findMany()
}

export const getPortofolioByIdHandler = async (id: string) => {
  return await prisma.portofolio.findUnique({ where: { id } })
}

export const getPortofolioBySlugHandler = async (slug: string) => {
  return await prisma.portofolio.findUnique({ where: { slug } })
}

export const createPortofolioHandler = async (data: PortofolioType) => {
  return await prisma.portofolio.create({ data })
}

export const updatePortofolioHandler = async (id: string, data: PortofolioType) => {
  return await prisma.portofolio.update({ where: { id }, data })
}

export const deletePortofolioHandler = async (id: string) => {
  return await prisma.portofolio.delete({ where: { id } })
}

export const deleteAllPortofoliosHandler = async () => {
  return await prisma.portofolio.deleteMany()
}
