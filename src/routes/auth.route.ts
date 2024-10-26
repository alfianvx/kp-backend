import { Router } from 'express'
import { createSession, registerUser, refreshToken } from '../controllers/auth.controller'

export const AuthRoute: Router = Router()

AuthRoute.post('/register', registerUser)
AuthRoute.post('/login', createSession)
AuthRoute.post('/refresh', refreshToken)
