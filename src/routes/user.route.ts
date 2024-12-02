import { Router } from 'express'
import { getUsers } from '../controllers/auth.controller'
import { requireAdmin } from '../middleware/auth'

export const UserRoute: Router = Router()

UserRoute.get('/', requireAdmin, getUsers)
