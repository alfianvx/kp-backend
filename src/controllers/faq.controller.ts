import { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'
import {
  createFaqHandler,
  deleteAllFaqsHandler,
  deleteFaqHandler,
  getFaqByIdHandler,
  getFaqsHanlder,
  updateFaqHandler
} from '../services/faq.service'
import { createFaqValidation } from '../validation/faq.validation'
import { FaqParams } from '../type/faq.type'

export const getFaq = async (req: Request<FaqParams>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    if (id) {
      const faq = await getFaqByIdHandler(id)
      if (!faq) {
        logger.error('ERR: get - faq', 'Faq not found')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Faq not found'
        })
        return
      }

      logger.info('get faq data successfully')
      res.status(200).json({
        status: true,
        statusCode: 200,
        message: 'Success get faq by id',
        data: faq
      })
      return
    }

    const faqs = await getFaqsHanlder()
    logger.info('get faq data successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: faqs.length === 0 ? 'Faq data is empty' : 'Success get faqs data',
      data: faqs
    })
  } catch (error) {
    logger.error('ERR: get - faq', error)
    next(error)
  }
}

export const createFaq = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { error, value } = createFaqValidation(req.body)
    if (error) {
      logger.error('ERR: create - faq', error.details[0].message)
      res.status(422).json({
        status: false,
        statusCode: 422,
        message: error.details[0].message
      })
      return
    }

    const faq = await createFaqHandler(value)
    logger.info('create faq successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Create faq successfully',
      data: faq
    })
  } catch (error) {
    logger.error('ERR: create - faq', error)
    next(error)
  }
}

export const updateFaq = async (req: Request<FaqParams>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    if (id) {
      const faq = await getFaqByIdHandler(id)
      if (!faq) {
        logger.error('ERR: get - faq', 'Faq not found')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Faq not found'
        })
        return
      }
    }

    const updatedFaq = await updateFaqHandler(id!, req.body)
    logger.info('faq updated successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Faq updated successfully',
      data: updatedFaq
    })
  } catch (error) {
    logger.error('ERR: update - faq', error)
    next(error)
  }
}

export const deleteFaq = async (req: Request<FaqParams>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    if (id) {
      const faq = await getFaqByIdHandler(id)
      if (!faq) {
        logger.error('ERR: get - faq', 'Faq not found')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Faq not found'
        })
        return
      }
    }

    await deleteFaqHandler(id!)
    logger.info('faq deleted successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Faq deleted successfully'
    })
  } catch (error) {
    logger.error('ERR: delete - faq', error)
    next(error)
  }
}

export const deleteAllFaq = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await deleteAllFaqsHandler()
    logger.info('all faqs deleted successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'All faqs deleted successfully'
    })
  } catch (error) {
    logger.error('ERR: delete - faq', error)
    next(error)
  }
}
