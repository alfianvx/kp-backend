import { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'

import { slugify } from '../utils/slugify'
import { PortofolioParams, PortofolioSlugParams } from '../types/portofolio.type'
import {
  createPortofolioHandler,
  deleteAllPortofoliosHandler,
  deletePortofolioHandler,
  getPortofolioByIdHandler,
  getPortofolioBySlugHandler,
  getPortofoliosHanlder,
  updatePortofolioHandler
} from '../services/portofolio.service'
import { createPortofolioValidation } from '../validation/portofolio.validation'

export const getPortoflio = async (
  req: Request<PortofolioParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params

    if (id) {
      const portofolio = await getPortofolioByIdHandler(id)
      if (!portofolio) {
        logger.error('ERR: get - portofolio', 'Portofolio not found')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Portofolio not found'
        })
        return
      }

      logger.info('get portofolio data successfully')
      res.status(200).json({
        status: true,
        statusCode: 200,
        message: 'Success get portofolio by id',
        data: portofolio
      })
      return
    }

    const portofolios = await getPortofoliosHanlder()
    logger.info('get portofolio data successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: portofolios.length === 0 ? 'Portofolios data is empty' : 'Success get portofolios data',
      data: portofolios
    })
  } catch (error) {
    logger.error('ERR: get - portofolio', error)
    next(error)
  }
}

export const getPortofolioBySlug = async (
  req: Request<PortofolioSlugParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params

    if (slug) {
      const portofolio = await getPortofolioBySlugHandler(slug)
      if (!portofolio) {
        logger.error('ERR: get - portofolio', 'Portofolio not found')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Portofolio not found'
        })
        return
      }

      logger.info('get portoflio data successfully')
      res.status(200).json({
        status: true,
        statusCode: 200,
        message: 'Success get portoflio by slug',
        data: portofolio
      })
    }
  } catch (error) {
    logger.error('ERR: get - portoflio', error)
    next(error)
  }
}

export const createPortofolio = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { error, value } = createPortofolioValidation(req.body)
    if (error) {
      logger.error('ERR: create - portofolio', error.details[0].message)
      res.status(422).json({
        status: false,
        statusCode: 422,
        message: error.details[0].message
      })
      return
    }

    const portoflio = await createPortofolioHandler({
      ...value,
      slug: slugify(value.name)
    })
    logger.info('create portofolio successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Create portoflio successfully',
      data: portoflio
    })
  } catch (error) {
    logger.error('ERR: create - portoflio', error)
    next(error)
  }
}

export const updatePortofolio = async (
  req: Request<PortofolioParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params

    if (id) {
      const portoflio = await getPortofolioByIdHandler(id)
      if (!portoflio) {
        logger.error('ERR: get - portoflio', 'Portoflio not found')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Portoflio not found'
        })
        return
      }
    }

    const updatedPortofolio = await updatePortofolioHandler(id!, req.body)
    logger.info('portofolio updated successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Portoflio updated successfully',
      data: updatedPortofolio
    })
  } catch (error) {
    logger.error('ERR: update - portofolio', error)
    next(error)
  }
}

export const deletePortofolio = async (
  req: Request<PortofolioParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params

    if (id) {
      const portoflio = await getPortofolioByIdHandler(id)
      if (!portoflio) {
        logger.error('ERR: get - portofolio', 'Portoflio not found')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Portofolio not found'
        })
        return
      }
    }

    await deletePortofolioHandler(id!)
    logger.info('portofolio deleted successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Portofolio deleted successfully'
    })
  } catch (error) {
    logger.error('ERR: delete - portofolio', error)
    next(error)
  }
}

export const deleteAllPortofolio = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await deleteAllPortofoliosHandler()
    logger.info('all porotofolio deleted successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'All portofolio deleted successfully'
    })
  } catch (error) {
    logger.error('ERR: delete - portofolio', error)
    next(error)
  }
}
