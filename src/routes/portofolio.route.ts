import { Router } from 'express'
import { requireAdmin } from '../middleware/auth'
import {
  createPortofolio,
  deleteAllPortofolio,
  deletePortofolio,
  getPortoflio,
  getPortofolioBySlug,
  updatePortofolio
} from '../controllers/portofolio.controller'

export const PortofolioRouter: Router = Router()

PortofolioRouter.get('/', getPortoflio)
PortofolioRouter.get('/:id', getPortoflio)
PortofolioRouter.get('/slug/:slug', getPortofolioBySlug)
PortofolioRouter.post('/', requireAdmin, createPortofolio)
PortofolioRouter.put('/:id', requireAdmin, updatePortofolio)
PortofolioRouter.delete('/all', requireAdmin, deleteAllPortofolio)
PortofolioRouter.delete('/:id', requireAdmin, deletePortofolio)
