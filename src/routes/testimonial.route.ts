import { Router } from 'express'
import { requireAdmin } from '../middleware/auth'
import {
  createTestimonial,
  deleteAllTestimonials,
  deleteTestimonial,
  getTestimonial,
  updateTestimonial
} from '../controllers/testimonial.controller'

export const TestimonialRouter: Router = Router()

TestimonialRouter.get('/', getTestimonial)
TestimonialRouter.get('/:id', requireAdmin, getTestimonial)
TestimonialRouter.post('/', requireAdmin, createTestimonial)
TestimonialRouter.put('/:id', requireAdmin, updateTestimonial)
TestimonialRouter.delete('/all', requireAdmin, deleteAllTestimonials)
TestimonialRouter.delete('/:id', requireAdmin, deleteTestimonial)
