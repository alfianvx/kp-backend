import { Router } from 'express'
import {
  createProduct,
  deleteAllProducts,
  deleteProduct,
  getProduct,
  getProductBySlug,
  updateProduct
} from '../controllers/product.controller'
import { requireAdmin } from '../middleware/auth'

export const ProductRouter: Router = Router()

ProductRouter.get('/', getProduct)
ProductRouter.get('/:id', getProduct)
ProductRouter.get('/slug/:slug', getProductBySlug)
ProductRouter.post('/', requireAdmin, createProduct)
ProductRouter.put('/:id', requireAdmin, updateProduct)
ProductRouter.delete('/all', requireAdmin, deleteAllProducts)
ProductRouter.delete('/:id', requireAdmin, deleteProduct)
