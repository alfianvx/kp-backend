import { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'
import { ServiceParams } from '../types/service.type'
import {
  createServiceHandler,
  deleteAllServicesHandler,
  deleteServiceHandler,
  getServiceByIdHandler,
  getServicesHanlder,
  updateServiceHandler
} from '../services/service.service'
import { createServiceValidation } from '../validation/service.validation'

export const getService = async (req: Request<ServiceParams>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    if (id) {
      const service = await getServiceByIdHandler(id)
      if (!service) {
        logger.error('ERR: get - service', 'Service not found')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Service not found'
        })
        return
      }

      logger.info('get service data successfully')
      res.status(200).json({
        status: true,
        statusCode: 200,
        message: 'Success get service by id',
        data: service
      })
      return
    }

    const services = await getServicesHanlder()
    logger.info('get services data successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: services.length === 0 ? 'Service data is empty' : 'Success get services data',
      data: services
    })
  } catch (error) {
    logger.error('ERR: get - service', error)
    next(error)
  }
}

export const createService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { error, value } = createServiceValidation(req.body)
    if (error) {
      logger.error('ERR: create - service', error.details[0].message)
      res.status(422).json({
        status: false,
        statusCode: 422,
        message: error.details[0].message
      })
      return
    }

    const service = await createServiceHandler(value)
    logger.info('create service successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Create service successfully',
      data: service
    })
  } catch (error) {
    logger.error('ERR: create - service', error)
    next(error)
  }
}

export const updateService = async (req: Request<ServiceParams>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    if (id) {
      const service = await getServiceByIdHandler(id)
      if (!service) {
        logger.error('ERR: get - service', 'Service not found')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Service not found'
        })
        return
      }
    }

    const updatedService = await updateServiceHandler(id!, req.body)
    logger.info('service updated successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Service updated successfully',
      data: updatedService
    })
  } catch (error) {
    logger.error('ERR: update - service', error)
    next(error)
  }
}

export const deleteService = async (req: Request<ServiceParams>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    if (id) {
      const service = await getServiceByIdHandler(id)
      if (!service) {
        logger.error('ERR: get - service', 'Service not found')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Service not found'
        })
        return
      }
    }

    await deleteServiceHandler(id!)
    logger.info('service deleted successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Service deleted successfully'
    })
  } catch (error) {
    logger.error('ERR: delete - service', error)
    next(error)
  }
}

export const deleteAllServices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await deleteAllServicesHandler()
    logger.info('all services deleted successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'All services deleted successfully'
    })
  } catch (error) {
    logger.error('ERR: delete - services', error)
    next(error)
  }
}
