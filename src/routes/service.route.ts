import { Router } from 'express'
import { requireAdmin } from '../middleware/auth'
import {
  createService,
  deleteAllServices,
  deleteService,
  getService,
  updateService
} from '../controllers/service.controller'

export const ServiceRouter: Router = Router()

ServiceRouter.get('/', getService)
ServiceRouter.get('/:id', requireAdmin, getService)
ServiceRouter.post('/', requireAdmin, createService)
ServiceRouter.put('/:id', requireAdmin, updateService)
ServiceRouter.delete('/all', requireAdmin, deleteAllServices)
ServiceRouter.delete('/:id', requireAdmin, deleteService)
