import { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'
import { ProductParams, ProductSlugParams } from '../types/product.type'
import {
  createProductHandler,
  deleteAllProductsHandler,
  deleteProductHandler,
  getProductByIdHandler,
  getProductBySlugHandler,
  getProductsHanlder,
  updateProductHandler
} from '../services/product.service'
import { createProductValidation } from '../validation/product.validation'
import { slugify } from '../utils/slugify'

export const getProduct = async (req: Request<ProductParams>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    if (id) {
      const product = await getProductByIdHandler(id)
      if (!product) {
        logger.error('ERR: get - product', 'Product not found')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Product not found'
        })
        return
      }

      logger.info('get product data successfully')
      res.status(200).json({
        status: true,
        statusCode: 200,
        message: 'Success get product by id',
        data: product
      })
      return
    }

    const products = await getProductsHanlder()
    logger.info('get products data successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: products.length === 0 ? 'Products data is empty' : 'Success get products data',
      data: products
    })
  } catch (error) {
    logger.error('ERR: get - products', error)
    next(error)
  }
}

export const getProductBySlug = async (
  req: Request<ProductSlugParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params

    if (slug) {
      const product = await getProductBySlugHandler(slug)
      if (!product) {
        logger.error('ERR: get - product', 'Product not found')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Product not found'
        })
        return
      }

      logger.info('get product data successfully')
      res.status(200).json({
        status: true,
        statusCode: 200,
        message: 'Success get product by slug',
        data: product
      })
    }
  } catch (error) {
    logger.error('ERR: get - product', error)
    next(error)
  }
}

export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { error, value } = createProductValidation(req.body)
    if (error) {
      logger.error('ERR: create - product', error.details[0].message)
      res.status(422).json({
        status: false,
        statusCode: 422,
        message: error.details[0].message
      })
      return
    }

    const product = await createProductHandler({
      ...value,
      slug: slugify(value.name)
    })
    logger.info('create product successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Create product successfully',
      data: product
    })
  } catch (error) {
    logger.error('ERR: create - product', error)
    next(error)
  }
}

export const updateProduct = async (req: Request<ProductParams>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    if (id) {
      const product = await getProductByIdHandler(id)
      if (!product) {
        logger.error('ERR: get - product', 'Product not found')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Product not found'
        })
        return
      }
    }

    const updatedProduct = await updateProductHandler(id!, req.body)
    logger.info('product updated successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Product updated successfully',
      data: updatedProduct
    })
  } catch (error) {
    logger.error('ERR: update - product', error)
    next(error)
  }
}

export const deleteProduct = async (req: Request<ProductParams>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    if (id) {
      const product = await getProductByIdHandler(id)
      if (!product) {
        logger.error('ERR: get - product', 'Product not found')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Product not found'
        })
        return
      }
    }

    await deleteProductHandler(id!)
    logger.info('product deleted successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Product deleted successfully'
    })
  } catch (error) {
    logger.error('ERR: delete - product', error)
    next(error)
  }
}

export const deleteAllProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await deleteAllProductsHandler()
    logger.info('all products deleted successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'All products deleted successfully'
    })
  } catch (error) {
    logger.error('ERR: delete - products', error)
    next(error)
  }
}
