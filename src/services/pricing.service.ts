import { prisma } from '.'
import { PricingType } from '../types/pricing.type'

export const getPricingsHanlder = async () => {
  return await prisma.pricing.findMany()
}

export const getPricingByIdHandler = async (id: string) => {
  return await prisma.pricing.findUnique({ where: { id } })
}

export const createPricingHandler = async (data: PricingType) => {
  return await prisma.pricing.create({ data })
}

export const updatePricingHandler = async (id: string, data: PricingType) => {
  return await prisma.pricing.update({ where: { id }, data })
}

export const deletePricingHandler = async (id: string) => {
  return await prisma.pricing.delete({ where: { id } })
}

export const deleteAllPricingsHandler = async () => {
  return await prisma.pricing.deleteMany()
}
