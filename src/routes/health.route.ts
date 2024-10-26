import { Router, Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'

export const HealtRouter: Router = Router()

HealtRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Health check success')
  res.status(200).send({
    status: true,
    statusCode: 200,
    message: 'Server Running Well ✨',
    api_doc: 'https://documenter.getpostman.com/view/23075381/2sAY4sj4Xi'
  })
})
