import { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'
import { PricingParams } from '../types/pricing.type'
import {
  createPricingHandler,
  deleteAllPricingsHandler,
  deletePricingHandler,
  getPricingByIdHandler,
  getPricingsHanlder,
  updatePricingHandler
} from '../services/pricing.service'
import { createPricingValidation } from '../validation/pricing.validation'

export const getPricing = async (req: Request<PricingParams>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    if (id) {
      const pricing = await getPricingByIdHandler(id)
      if (!pricing) {
        logger.error('ERR: get - pricing', 'Pricing not found')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Pricing not found'
        })
        return
      }

      logger.info('get pricing data successfully')
      res.status(200).json({
        status: true,
        statusCode: 200,
        message: 'Success get pricing by id',
        data: pricing
      })
      return
    }

    const pricings = await getPricingsHanlder()
    logger.info('get pricings data successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: pricings.length === 0 ? 'Pricing data is empty' : 'Success get pricings data',
      data: pricings
    })
  } catch (error) {
    logger.error('ERR: get - pricing', error)
    next(error)
  }
}

export const createPricing = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { error, value } = createPricingValidation(req.body)
    if (error) {
      logger.error('ERR: create - pricing', error.details[0].message)
      res.status(422).json({
        status: false,
        statusCode: 422,
        message: error.details[0].message
      })
      return
    }

    const pricing = await createPricingHandler(value)
    logger.info('create pricing successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Create pricing successfully',
      data: pricing
    })
  } catch (error) {
    logger.error('ERR: create - pricing', error)
    next(error)
  }
}

export const updatePricing = async (req: Request<PricingParams>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    if (id) {
      const pricing = await getPricingByIdHandler(id)
      if (!pricing) {
        logger.error('ERR: get - pricing', 'Pricing not found')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Pricing not found'
        })
        return
      }
    }

    const updatedPricing = await updatePricingHandler(id!, req.body)
    logger.info('pricing updated successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Pricing updated successfully',
      data: updatedPricing
    })
  } catch (error) {
    logger.error('ERR: update - pricing', error)
    next(error)
  }
}

export const deletePricing = async (req: Request<PricingParams>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    if (id) {
      const pricing = await getPricingByIdHandler(id)
      if (!pricing) {
        logger.error('ERR: get - pricing', 'Pricing not found')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Pricing not found'
        })
        return
      }
    }

    await deletePricingHandler(id!)
    logger.info('pricing deleted successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Pricing deleted successfully'
    })
  } catch (error) {
    logger.error('ERR: delete - pricing', error)
    next(error)
  }
}

export const deleteAllPricings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await deleteAllPricingsHandler()
    logger.info('all pricings deleted successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'All pricings deleted successfully'
    })
  } catch (error) {
    logger.error('ERR: delete - pricings', error)
    next(error)
  }
}
