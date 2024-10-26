import { Request, Response } from 'express'
import { createProductValidation } from '../validation/product.validation'
import { logger } from '../utils/logger'
import {
  createProductHandler,
  deleteProductHandler,
  getProductByIdHandler,
  getProductsHanlder,
  updateProductHandler
} from '../services/product.service'

export const getProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req
  if (id) {
    const product = await getProductByIdHandler(id)
    if (!product) {
      res.status(404).send({ status: false, statusCode: 404, message: 'Product not found' })
      logger.error('ERR: get - product', 'Product not found')
    }
    logger.info('get product data successfully')
    res.status(200).send({ status: true, statusCode: 200, message: 'Success get product by id', data: product })
  } else {
    const products = await getProductsHanlder()
    logger.info('get product data successfully')
    res.status(200).send({ status: true, statusCode: 200, message: 'Success get products data', data: products })
  }
}

export const createProduct = async (req: Request, res: Response) => {
  const { error, value } = createProductValidation(req.body)
  if (error) {
    res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
    logger.error('ERR: create - product', error.details[0].message)
  }
  const product = await createProductHandler(value)
  res.status(200).send({ status: true, statusCode: 200, message: 'Create product successfully', data: product })
  logger.info('create product successfully')
}

export const updateProduct = async (req: Request, res: Response) => {
  const {
    params: { id },
    body
  } = req
  const product = await getProductByIdHandler(id)
  if (!product) {
    res.status(404).send({ status: false, statusCode: 404, message: 'Product not found' })
    logger.error('ERR: update - product', 'Product not found')
  }
  const updatedProduct = await updateProductHandler(id, body)
  res.status(200).send({ status: true, statusCode: 200, message: 'Update product successfully', data: updatedProduct })
  logger.info('update product successfully')
}

export const deleteProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req
  if (id) {
    const product = await getProductByIdHandler(id)
    if (!product) {
      res.status(404).send({ status: false, statusCode: 404, message: 'Product not found' })
      logger.error('ERR: delete - product', 'Product not found')
    }
    await deleteProductHandler(id)
    res.status(200).send({ status: true, statusCode: 200, message: 'Delete product successfully' })
    logger.info('delete product successfully')
  }
}
