import { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'
import { TestimonialParams } from '../types/testimonial.type'
import {
  createTestimonialHandler,
  deleteAllTestimonialsHandler,
  deleteTestimonialHandler,
  getTestimonialByIdHandler,
  getTestimonialsHanlder,
  updateTestimonialHandler
} from '../services/testimonial.service'
import { createTestimoniallValidation } from '../validation/testimonial.validation'

export const getTestimonial = async (
  req: Request<TestimonialParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params

    if (id) {
      const testimonial = await getTestimonialByIdHandler(id)
      if (!testimonial) {
        logger.error('ERR: get - testimonial', 'Testimonial not found')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Testimonial not found'
        })
        return
      }

      logger.info('get testimonial data successfully')
      res.status(200).json({
        status: true,
        statusCode: 200,
        message: 'Success get testimonial by id',
        data: testimonial
      })
      return
    }

    const testimonials = await getTestimonialsHanlder()
    logger.info('get testimonals data successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: testimonials.length === 0 ? 'Testimonials data is empty' : 'Success get testimonials data',
      data: testimonials
    })
  } catch (error) {
    logger.error('ERR: get - testimonials', error)
    next(error)
  }
}

export const createTestimonial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { error, value } = createTestimoniallValidation(req.body)
    if (error) {
      logger.error('ERR: create - testimonial', error.details[0].message)
      res.status(422).json({
        status: false,
        statusCode: 422,
        message: error.details[0].message
      })
      return
    }

    const faq = await createTestimonialHandler(value)
    logger.info('create testimonial successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Create testimonial successfully',
      data: faq
    })
  } catch (error) {
    logger.error('ERR: create - testimonial', error)
    next(error)
  }
}

export const updateTestimonial = async (
  req: Request<TestimonialParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params

    if (id) {
      const faq = await getTestimonialByIdHandler(id)
      if (!faq) {
        logger.error('ERR: get - testimonial', 'Testimonial not found')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Testimonial not found'
        })
        return
      }
    }

    const updatedTestimonial = await updateTestimonialHandler(id!, req.body)
    logger.info('testimonial updated successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Testimonial updated successfully',
      data: updatedTestimonial
    })
  } catch (error) {
    logger.error('ERR: update - testimonial', error)
    next(error)
  }
}

export const deleteTestimonial = async (
  req: Request<TestimonialParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params

    if (id) {
      const faq = await getTestimonialByIdHandler(id)
      if (!faq) {
        logger.error('ERR: get - testimonial', 'Testimonial not found')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Testimonial not found'
        })
        return
      }
    }

    await deleteTestimonialHandler(id!)
    logger.info('testimonial deleted successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Testimonial deleted successfully'
    })
  } catch (error) {
    logger.error('ERR: delete - testimonial', error)
    next(error)
  }
}

export const deleteAllTestimonials = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await deleteAllTestimonialsHandler()
    logger.info('all testimonials deleted successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'All testimonials deleted successfully'
    })
  } catch (error) {
    logger.error('ERR: delete - testimonials', error)
    next(error)
  }
}
