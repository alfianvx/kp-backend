import { Router } from 'express'
import { requireAdmin } from '../middleware/auth'
import { createFaq, deleteAllFaq, deleteFaq, getFaq, updateFaq } from '../controllers/faq.controller'

export const FaqRouter: Router = Router()

FaqRouter.get('/', getFaq)
FaqRouter.get('/:id', requireAdmin, getFaq)
FaqRouter.post('/', requireAdmin, createFaq)
FaqRouter.put('/:id', requireAdmin, updateFaq)
FaqRouter.delete('/all', requireAdmin, deleteAllFaq)
FaqRouter.delete('/:id', requireAdmin, deleteFaq)
