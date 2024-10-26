import { ProductType } from '../type/product.type'
import { prisma } from '.'

export const getProductsHanlder = async () => {
  return await prisma.product.findMany()
}

export const getProductByIdHandler = async (id: string) => {
  return await prisma.product.findUnique({ where: { id } })
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
