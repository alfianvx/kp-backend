import { Router } from 'express'
import { requireAdmin } from '../middleware/auth'
import {
  createPricing,
  deleteAllPricings,
  deletePricing,
  getPricing,
  updatePricing
} from '../controllers/pricing.controller'

export const PricingRouter: Router = Router()

PricingRouter.get('/', getPricing)
PricingRouter.get('/:id', requireAdmin, getPricing)
PricingRouter.post('/', requireAdmin, createPricing)
PricingRouter.put('/:id', requireAdmin, updatePricing)
PricingRouter.delete('/all', requireAdmin, deleteAllPricings)
PricingRouter.delete('/:id', requireAdmin, deletePricing)
