import { Router } from 'express'
import { createClient, deleteAllClients, deleteClient, getClient, updateClient } from '../controllers/client.controller'
import { requireAdmin } from '../middleware/auth'

export const ClientRouter: Router = Router()

ClientRouter.get('/', getClient)
ClientRouter.get('/:id', requireAdmin, getClient)
ClientRouter.post('/', requireAdmin, createClient)
ClientRouter.put('/:id', requireAdmin, updateClient)
ClientRouter.delete('/all', requireAdmin, deleteAllClients)
ClientRouter.delete('/:id', requireAdmin, deleteClient)
