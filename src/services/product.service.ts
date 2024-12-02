import { prisma } from '.'
import { ProductType } from '../types/product.type'

export const getProductsHanlder = async () => {
  return await prisma.product.findMany()
}

export const getProductByIdHandler = async (id: string) => {
  return await prisma.product.findUnique({ where: { id } })
}

export const getProductBySlugHandler = async (slug: string) => {
  return await prisma.product.findUnique({ where: { slug } })
}

export const createProductHandler = async (data: ProductType) => {
  return await prisma.product.create({ data })
}

export const updateProductHandler = async (id: string, data: ProductType) => {
  return await prisma.product.update({ where: { id }, data })
}

export const deleteProductHandler = async (id: string) => {
  return await prisma.product.delete({ where: { id } })
}

export const deleteAllProductsHandler = async () => {
  return await prisma.product.deleteMany()
}
