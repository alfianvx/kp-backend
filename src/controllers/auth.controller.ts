import { NextFunction, Request, Response } from 'express'
import { logger } from '../utils/logger'
import { createSessionValidation, createUserValidation, refreshTokenValidation } from '../validation/auth.validation'
import { comparePassword, encode } from '../utils/hasing'
import {
  createUserHandler,
  findUserByEmail,
  getUserByIdHandler,
  getUsersHandler,
  updateUserHandler
} from '../services/auth.service'
import { signJWT, verifyJWT } from '../utils/jwt'

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { value, error } = createUserValidation(req.body)
  if (error) {
    logger.error('ERR: auth - register', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    value.password = encode(value.password)

    await createUserHandler(value)
    logger.info('INFO: auth - register', 'User created successfully')
    return res.status(201).send({ status: true, statusCode: 201, message: 'User created successfully' })
  } catch (error) {
    logger.error('ERR: auth - register', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const createSession = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { value, error } = createSessionValidation(req.body)
  if (error) {
    logger.error('ERR: auth - login', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    // check if user exists
    const user = await findUserByEmail(value.email)
    if (!user) {
      logger.error('ERR: auth - login', 'Invalid email or password')
      return res.status(401).send({ status: false, statusCode: 401, message: 'Invalid email or password' })
    }
    // check if password is correct
    const isValid = comparePassword(value.password, user.password)
    if (!isValid) {
      logger.error('ERR: auth - login', 'Invalid email or password')
      return res.status(401).send({ status: false, statusCode: 401, message: 'Invalid email or password' })
    }

    const accessToken = signJWT({ ...user }, { expiresIn: '7d' })

    const refreshToken = signJWT({ ...user }, { expiresIn: '30d' })

    logger.info('INFO: auth - login', 'User logged in successfully')
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'User logged in successfully',
      data: {
        profile: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.avatar
        },
        accessToken,
        refreshToken
      }
    })
  } catch (error: any) {
    logger.error('ERR: auth - login', error.message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.message })
  }
}

export const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { value, error } = refreshTokenValidation(req.body)
  if (error) {
    logger.error('ERR: auth - refresh session', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    const { decoded }: any = verifyJWT(value.refreshToken)

    const user = await findUserByEmail(decoded.email)
    if (!user) return false

    const accessToken = signJWT({ ...user }, { expiresIn: '1d' })

    return res
      .status(200)
      .send({ status: true, statusCode: 200, message: 'Refresh Session Successfully', data: { accessToken } })
  } catch (error: any) {
    logger.error('ERR: refresh token', error.message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.message })
  }
}

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const users = await getUsersHandler()
    logger.info('INFO: auth - getUsers', 'Users fetched successfully')
    return res.status(200).send({ status: true, statusCode: 200, message: 'Users fetched successfully', data: users })
  } catch (error) {
    logger.error('ERR: auth - getUsers', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params

    if (id) {
      const user = await getUserByIdHandler(id)
      if (!user) {
        logger.error('ERR: get - user', 'User not found')
        res.status(404).json({
          status: false,
          statusCode: 404,
          message: 'User not found'
        })
        return
      }
    }

    const updatedUser = await updateUserHandler(id, req.body)
    logger.info('user profile updated successfully')
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'User updated successfully',
      data: updatedUser
    })
  } catch (error) {
    logger.error('ERR: update - user', error)
    next(error)
  }
}
