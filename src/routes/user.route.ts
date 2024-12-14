import { Router } from 'express'
import { getUsers, updateUser } from '../controllers/auth.controller'
import { requireAdmin, requireUser } from '../middleware/auth'

export const UserRoute: Router = Router()

UserRoute.get('/', requireAdmin, getUsers)
UserRoute.put('/:id', requireUser, updateUser)
