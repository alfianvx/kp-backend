import { Request, Response } from 'express'
import { logger } from '../utils/logger'
import {
  createFaqHandler,
  deleteFaqHandler,
  getFaqByIdHandler,
  getFaqsHanlder,
  updateFaqHandler
} from '../services/faq.service'
import { createFaqValidation } from '../validation/faq.validation'

export const getFaq = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req
  if (id) {
    const faq = await getFaqByIdHandler(id)
    if (!faq) {
      res.status(404).send({ status: false, statusCode: 404, message: 'Faq not found' })
      logger.error('ERR: get - faq', 'Faq not found')
    }
    logger.info('get faq data successfully')
    res.status(200).send({ status: true, statusCode: 200, message: 'Success get faq by id', data: faq })
  } else {
    const faqs = await getFaqsHanlder()
    if (faqs.length === 0) {
      res.status(200).send({ status: true, statusCode: 200, message: 'Faq data is empty', data: [] })
      logger.error('ERR: get - faq', 'Faq not found')
    }
    logger.info('get faq data successfully')
    res.status(200).send({ status: true, statusCode: 200, message: 'Success get faqs data', data: faqs })
  }
}

export const createFaq = async (req: Request, res: Response) => {
  const { error, value } = createFaqValidation(req.body)
  if (error) {
    res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
    logger.error('ERR: create - faq', error.details[0].message)
  }
  const faq = await createFaqHandler(value)
  res.status(200).send({ status: true, statusCode: 200, message: 'Create faq successfully', data: faq })
  logger.info('create faq successfully')
}

export const updateFaq = async (req: Request, res: Response) => {
  const {
    params: { id },
    body
  } = req
  const faq = await getFaqByIdHandler(id)
  if (!faq) {
    res.status(404).send({ status: false, statusCode: 404, message: 'Faq not found' })
    logger.error('ERR: update - faq', 'Faq not found')
  }
  const updatedFaq = await updateFaqHandler(id, body)
  res.status(200).send({ status: true, statusCode: 200, message: 'Faq updated successfully', data: updatedFaq })
  logger.info('faq updated successfully')
}

export const deleteFaq = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req
  if (id) {
    const faq = await getFaqByIdHandler(id)
    if (!faq) {
      res.status(404).send({ status: false, statusCode: 404, message: 'Faq not found' })
      logger.error('ERR: delete - faq', 'Faq not found')
    }
    await deleteFaqHandler(id)
    res.status(200).send({ status: true, statusCode: 200, message: 'Faq deleted successfully' })
    logger.info('faq deleted successfully')
  }
}
