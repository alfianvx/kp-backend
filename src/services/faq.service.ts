import { prisma } from '.'
import { FaqType } from '../type/faq.type'

export const getFaqsHanlder = async () => {
  return await prisma.faq.findMany()
}

export const getFaqByIdHandler = async (id: string) => {
  return await prisma.faq.findUnique({ where: { id } })
}

export const createFaqHandler = async (data: FaqType) => {
  return await prisma.faq.create({ data })
}

export const updateFaqHandler = async (id: string, data: FaqType) => {
  return await prisma.faq.update({ where: { id }, data })
}

export const deleteFaqHandler = async (id: string) => {
  return await prisma.faq.delete({ where: { id } })
}

export const deleteAllFaqsHandler = async () => {
  return await prisma.faq.deleteMany()
}
