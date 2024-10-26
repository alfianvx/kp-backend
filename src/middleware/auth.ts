import { NextFunction, Response } from 'express'

export const requireUser = (_: any, res: Response, next: NextFunction): void => {
  const user = res.locals.user
  if (!user) {
    res.status(403).json({
      message: 'Unauthorized'
    })
    return
  }
  next()
}

export const requireAdmin = (_: any, res: Response, next: NextFunction): void => {
  const user = res.locals.user
  if (!user || user.role !== 'ADMIN') {
    res.status(403).json({
      message: 'Unauthorized'
    })
    return
  }
  next()
}
