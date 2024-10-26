import { Router } from 'express'
import { createFaq, deleteFaq, getFaq, updateFaq } from '../controllers/faq.controller'
import { requireAdmin } from '../middleware/auth'

export const FaqRouter: Router = Router()

FaqRouter.get('/', getFaq)
FaqRouter.get('/:id', requireAdmin, getFaq)
FaqRouter.post('/', requireAdmin, createFaq)
FaqRouter.put('/:id', requireAdmin, updateFaq)
FaqRouter.delete('/:id', requireAdmin, deleteFaq)
