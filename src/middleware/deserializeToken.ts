import { NextFunction, Request, Response } from 'express'
import { verifyJWT } from '../utils/jwt'

const deserializeToken = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.replace('Bearer ', '')
  if (!accessToken) {
    next()
    return
  }

  const token = verifyJWT(accessToken)
  if (token.valid) {
    res.locals.user = token.decoded
  }

  if (token.expired) {
    next()
    return
  }

  next()
}

export default deserializeToken
