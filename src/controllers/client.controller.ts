import { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'
import { ClientParams } from '../types/client.type'
import {
  createClientHandler,
  deleteAllCLientsHandler,
  deleteClientHandler,
  getClientByIdHandler,
  getClientsHanlder,
  updateClientHandler
} from '../services/client.service'
import { createClientValidation } from '../validation/client.validation'

export const getClient = async (req: Request<ClientParams>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    if (id) {
      const client = await getClientByIdHandler(id)
      if (!client) {
        logger.error('ERR: get - client', 'Client not found')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Client not found'
        })
        return
      }

      logger.info('get client data successfully')
      res.status(200).json({
        status: true,
        statusCode: 200,
        message: 'Success get client by id',
        data: client
      })
      return
    }

    const clients = await getClientsHanlder()
    logger.info('get clients data successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: clients.length === 0 ? 'Client data is empty' : 'Success get client data',
      data: clients
    })
  } catch (error) {
    logger.error('ERR: get - client', error)
    next(error)
  }
}

export const createClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { error, value } = createClientValidation(req.body)
    if (error) {
      logger.error('ERR: create - client', error.details[0].message)
      res.status(422).json({
        status: false,
        statusCode: 422,
        message: error.details[0].message
      })
      return
    }

    const faq = await createClientHandler(value)
    logger.info('create client successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Create client successfully',
      data: faq
    })
  } catch (error) {
    logger.error('ERR: create - client', error)
    next(error)
  }
}

export const updateClient = async (req: Request<ClientParams>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    if (id) {
      const faq = await getClientByIdHandler(id)
      if (!faq) {
        logger.error('ERR: get - client', 'Client not found')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Client not found'
        })
        return
      }
    }

    const updatedClient = await updateClientHandler(id!, req.body)
    logger.info('client updated successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Client updated successfully',
      data: updatedClient
    })
  } catch (error) {
    logger.error('ERR: update - client', error)
    next(error)
  }
}

export const deleteClient = async (req: Request<ClientParams>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    if (id) {
      const faq = await getClientByIdHandler(id)
      if (!faq) {
        logger.error('ERR: get - client', 'Client not found')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'Client not found'
        })
        return
      }
    }

    await deleteClientHandler(id!)
    logger.info('client deleted successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Client deleted successfully'
    })
  } catch (error) {
    logger.error('ERR: delete - client', error)
    next(error)
  }
}

export const deleteAllClients = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await deleteAllCLientsHandler()
    logger.info('all clients deleted successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'All clients deleted successfully'
    })
  } catch (error) {
    logger.error('ERR: delete - client', error)
    next(error)
  }
}
